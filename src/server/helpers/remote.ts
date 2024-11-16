import { errors } from '@appium/base-driver';
import type { ExternalDriver } from '@appium/types';
import type { HtmlDriver } from '../Driver.js';

export function remote<Command extends keyof ExternalDriver>(
  command: Command,
  options: {
    requireWindow?: boolean;
    noWait?: boolean;
  } = {}
): NonNullable<ExternalDriver[Command]> {
  return function (this: HtmlDriver, ...args: unknown[]) {
    if (options.requireWindow && this.socket?.data.type !== 'window') {
      throw new errors.UnsupportedOperationError(`'${command}' is not supported in frame`);
    }

    // @ts-expect-error - client & server commands are not yet aligned
    return this.executeRemoteCommand(command, ...args);
  } as NonNullable<ExternalDriver[Command]>;
}
