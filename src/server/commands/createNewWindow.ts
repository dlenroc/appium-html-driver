import { errors } from '@appium/base-driver';
import type { NewWindow, NewWindowType } from '@appium/types';
import type { HtmlDriver } from '../Driver.js';
import { retrying } from '../helpers/retrying.js';

export async function createNewWindow(this: HtmlDriver, type: NewWindowType): Promise<NewWindow> {
  const window = await this.executeRemoteCommand('createNewWindow', type);

  await retrying({
    timeout: this.socketTimeoutMs,
    validate: (result?: boolean) => !!result === true,
    command: async () => {
      const handles = await this.getWindowHandles();
      if (!handles.includes(window.handle)) {
        throw new errors.UnsupportedOperationError('window creation confirmation not received');
      }

      return true;
    },
  });

  return window;
}
