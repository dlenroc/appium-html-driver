import type { WindowHandle } from '@appium/base-driver';
import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver';
import { remote } from '../helpers/remote';
import { waitSocket } from '../helpers/server';

export async function createWindow(this: Driver, type: string): Promise<WindowHandle> {
  const window = await remote('createWindow', { requireWindow: true }).call(this, type);

  const connected = await waitSocket(this.namespace, window.handle, this.socketTimeoutMs);
  if (!connected) {
    throw new errors.UnsupportedOperationError('window creation confirmation not received');
  }

  return window;
}
