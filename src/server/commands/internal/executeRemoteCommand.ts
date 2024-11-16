import { errorFromW3CJsonCode, errors } from '@appium/base-driver';
import type { Driver as ClientDriver } from '../../../client/Driver';
import type { HtmlDriver } from '../../Driver';

type Commands = {
  [K in keyof ClientDriver as ClientDriver[K] extends (...args: unknown[]) => unknown ? K : never]: ClientDriver[K];
};

export function executeRemoteCommand<T extends keyof Commands>(this: HtmlDriver, command: T, ...args: Parameters<Commands[T]>): Promise<Awaited<ReturnType<Commands[T]>>> {
  const connection = this.socket!;
  if (!connection?.connected) {
    throw new errors.NoSuchWindowError(`target window disconnected unexpectedly`);
  }

  return new Promise((resolve, reject) => {
    let finished = false;

    const timeout = setTimeout(onTimeout, this.scriptTimeoutMs);
    connection.once('disconnect', onDisconnect);
    connection.emit('command', { command, args }, ([error, response]: [Error, Awaited<ReturnType<Commands[T]>>]) => onResponse(error, response));

    function onDisconnect() {
      finished = true;
      clearTimeout(timeout);
      reject(new errors.NoSuchWindowError('target window disconnected unexpectedly'));
    }

    function onTimeout() {
      finished = true;
      connection.removeListener('disconnect', onDisconnect);
      reject(new errors.TimeoutError(`script timeout exceeded`));
    }

    function onResponse(error: Error, data: Awaited<ReturnType<Commands[T]>>) {
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
}
