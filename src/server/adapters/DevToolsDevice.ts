import { errorFromW3CJsonCode, errors } from '@appium/base-driver';
import CDP from 'chrome-remote-interface';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import { retrying } from '../helpers/retrying';
import { RemoteDevice } from './RemoteDevice';

export class DevToolsDevice implements RemoteDevice {
  private cdp!: CDP.Client;
  private options!: CDP.Options;
  private targetId!: string;
  private sessionId!: string;
  private commandScript = fs.readFileSync(path.resolve(__dirname, 'commands', 'command.js'));

  async open(options: CDP.Options) {
    this.options = options;
    this.cdp = await CDP(this.options);
  }

  async close() {
    this.cdp.close();
  }

  async getType(): Promise<'window'> {
    return 'window';
  }

  async getSession(): Promise<string> {
    return this.targetId;
  }

  async getSessions(): Promise<string[]> {
    const targets = await this.cdp.Target.getTargets();
    return targets.targetInfos.filter((target) => target.type === 'page').map((target) => target.targetId).reverse();
  }

  async setSession(sessionId: string): Promise<void> {
    const targets = await this.cdp.Target.getTargets();
    for (const target of targets.targetInfos) {
      if (target.attached) {
        await this.cdp.Target.detachFromTarget({ targetId: target.targetId }).catch((e) => null);
      }
    }

    const response = await this.cdp.Target.attachToTarget({ targetId: sessionId, flatten: true });
    this.targetId = sessionId;
    this.sessionId = response.sessionId;
  }

  async execute(expression: string, options: { timeout?: number; noWait?: boolean }, args: any[]): Promise<any> {
    const udid = randomUUID();
    const response = await this.cdp.Runtime.evaluate(
      {
        returnByValue: true,
        expression: `
          var APPIUM_HTML_RESULTS = window.APPIUM_HTML_RESULTS || (window.APPIUM_HTML_RESULTS = {});
          ${this.commandScript}; driver.command(${JSON.stringify({ expression, options, args })}, function(result) { APPIUM_HTML_RESULTS['${udid}'] = result });
          APPIUM_HTML_RESULTS['${udid}'];
        `,
      },
      // @ts-ignore
      this.sessionId
    );

    let value = response.result.value;

    if (!value) {
      value = await retrying({
        timeout: options.timeout || 5000,
        validate: (result) => !!result,
        command: async () => {
          const response = await this.cdp.Runtime.evaluate(
            {
              returnByValue: true,
              expression: `var result = APPIUM_HTML_RESULTS['${udid}']; if (result) delete APPIUM_HTML_RESULTS['${udid}']; result`,
            },
            // @ts-ignore
            this.sessionId
          );

          const value = response.result.value;
          if (!value) {
            throw new errors.TimeoutError(`script timeout exceeded`);
          }

          return value;
        },
      });
    }

    if (value.error) {
      throw errorFromW3CJsonCode(value.error.name, value.error.message, value.error.stack);
    }

    return value.result;
  }
}
