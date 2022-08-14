import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver';
import { remote } from '../helpers/remote';
import { retrying } from '../helpers/retrying';

export async function closeWindow(this: Driver): Promise<string[]> {
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
