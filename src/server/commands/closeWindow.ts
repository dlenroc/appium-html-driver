import { errors } from '@appium/base-driver';
import type { HtmlDriver } from '../Driver.js';
import { retrying } from '../helpers/retrying.js';

export async function closeWindow(this: HtmlDriver): Promise<string[]> {
  const handle = await this.getWindowHandle();

  await this.executeRemoteCommand('closeWindow');

  return retrying({
    timeout: this.socketTimeoutMs,
    validate: (result?: string[]) => !!result,
    command: async () => {
      const handles = await this.getWindowHandles();

      if (handles.includes(handle)) {
        throw new errors.UnsupportedOperationError('window close confirmation not received');
      }

      return handles;
    },
  });
}
