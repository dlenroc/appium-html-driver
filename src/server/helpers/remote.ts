import { errors } from '@appium/base-driver';
import type { Element, ExternalDriver } from '@appium/types';
import fs from 'fs/promises';
import path from 'path';
import type { HtmlDriver } from '../Driver.js';

const scripts: Record<string, string> = {};

export function remote<Command extends keyof ExternalDriver | string>(command: Command, options: { requireWindow?: boolean; noWait?: boolean; context?: Record<string, any>; frame?: Element } = {}): NonNullable<Command extends keyof ExternalDriver ? ExternalDriver[Command] : any> {
  return async function (this: HtmlDriver, ...args: any[]) {
    if (options.requireWindow && (await this.remote.getType()) !== 'window') {
      throw new errors.UnsupportedOperationError(`'${command}' is not supported in frame`);
    }

    if (this.frames.length) {
      options.frame = this.frames[this.frames.length - 1];
    }

    if (!scripts[command]) {
      const content = await fs.readFile(path.resolve(new URL(import.meta.url + '/..').pathname, 'commands', command + '.js'), 'utf-8');
      scripts[command] = `${content}\nreturn driver.${command}.apply(this, arguments);`
    }

    return await this.remote.execute(scripts[command], options, args);
  } as any;
}
