import type { Driver as ClientDriver } from '../../client/Driver';
import type { HtmlDriver } from '../Driver';

type Commands = {
  [K in keyof ClientDriver as ClientDriver[K] extends (...args: never[]) => unknown ? K : never]: ClientDriver[K];
};

export function remote<T extends keyof Commands>(command: T) {
  return function (this: HtmlDriver, ...args: Parameters<Commands[T]>) {
    return this.executeRemoteCommand(command, ...args);
  };
}
