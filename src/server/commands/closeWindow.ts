import { errors } from '@appium/base-driver';
import type { HtmlDriver } from '../Driver.js';
import { remote } from '../helpers/remote.js';
import { retrying } from '../helpers/retrying.js';

export async function closeWindow(this: HtmlDriver): Promise<string[]> {
  const handle = await this.getWindowHandle();

  await remote('closeWindow', { requireWindow: true, noWait: true }).call(this);

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
