import type { BaseDriver } from '@appium/base-driver';
import { errorFromW3CJsonCode, errors } from '@appium/base-driver';
import type { Driver } from '../Driver';
import { getSocket, isWindow } from './server';

export function remote<Command extends keyof BaseDriver>(command: Command, options: { noWait?: boolean; requireWindow?: boolean } = {}): NonNullable<BaseDriver[Command]> {
  return async function (this: Driver, ...args: any[]) {
    const handle = await this.getWindowHandle();
    const connection = getSocket(this.namespace, handle)!;

    if (!connection?.connected) {
      throw new errors.NoSuchWindowError(`target window disconnected unexpectedly`);
    }

    if (options.requireWindow && !isWindow(connection)) {
      throw new errors.UnsupportedOperationError(`'${command}' is not supported in frame`);
    }

    return new Promise((resolve, reject) => {
      let finished = false;

      const timeout = setTimeout(onTimeout, this.scriptTimeoutMs);
      connection.once('disconnect', onDisconnect);
      connection.emit('command', { command, args, options }, (response: any) => onResponse(response.error, response.result));

      function onDisconnect() {
        finished = true;
        clearTimeout(timeout);
        reject(new errors.NoSuchWindowError('target window disconnected unexpectedly'));
      }

      function onTimeout() {
        finished = true;
        connection.removeListener('disconnect', onDisconnect);
        reject(new errors.TimeoutError(`script timeout exceeded during execution of '${command}'`));
      }

      function onResponse(error: any, data: any) {
        if (finished) return;

        finished = true;
        clearTimeout(timeout);
        connection.removeListener('disconnect', onDisconnect);

        if (error) {
          reject(errorFromW3CJsonCode(error.name, error.message, error.stack));
        } else {
          resolve(data);
        }
      }
    });
  } as unknown as NonNullable<BaseDriver[Command]>;
}
