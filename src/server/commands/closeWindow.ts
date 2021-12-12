import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver';
import { remote } from '../helpers/remote';
import { getSocket, waitSocketDisconnection } from '../helpers/server';

export async function closeWindow(this: Driver): Promise<string[]> {
  const handle = await this.getWindowHandle();
  const socket = getSocket(this.namespace, handle);

  await remote('closeWindow', { requireWindow: true, noWait: true }).call(this);

  if (socket) {
    const closed = await waitSocketDisconnection(socket, this.socketTimeoutMs);
    if (!closed) {
      throw new errors.UnsupportedOperationError('window close confirmation not received');
    }
  }

  return this.getWindowHandles();
}
