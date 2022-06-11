import { errors } from '@appium/base-driver';
import type { Element, ExternalDriver } from '@appium/types';
import fs from 'fs/promises';
import path from 'path';
import type { Driver } from '../Driver';

const scripts: Record<string, string> = {};

export function remote<Command extends keyof ExternalDriver | string>(command: Command, options: { requireWindow?: boolean; noWait?: boolean; context?: Record<string, any>; frame?: Element } = {}): NonNullable<Command extends keyof ExternalDriver ? ExternalDriver[Command] : any> {
  return async function (this: Driver, ...args: any[]) {
    if (options.requireWindow && (await this.remote.getType()) !== 'window') {
      throw new errors.UnsupportedOperationError(`'${command}' is not supported in frame`);
    }

    if (this.frames.length) {
      options.frame = this.frames[this.frames.length - 1];
    }

    return await this.remote.execute(
      `
        ${scripts[command] || (scripts[command] = await fs.readFile(path.resolve(__dirname, 'commands', command + '.js'), 'utf-8'))}
        return driver.${command}.apply(this, arguments);
      `,
      options,
      args
    );
  } as any;
}
