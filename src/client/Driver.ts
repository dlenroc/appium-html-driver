/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import * as Commands from './commands.js';
import { UnknownError } from './errors/UnknownError.js';

class Driver {
  protected contexts: Window[] = [window];
  protected topContext: Window = window;
  get currentContext() {
    if (this.contexts.length === 0) {
      throw UnknownError('No window found.');
    }

    return this.contexts[this.contexts.length - 1];
  }
}

type Commands = typeof Commands;
type DriverCommands = { [Command in keyof Commands]: Commands[Command] };
interface Driver extends DriverCommands {}
for (const command in Commands) {
  (Driver.prototype as unknown as Record<string, unknown>)[command] = Commands[command as keyof Commands];
}

export { Driver };
