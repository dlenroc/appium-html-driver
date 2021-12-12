import { errors } from '@appium/base-driver';
import { performance } from 'perf_hooks';
import type { Driver } from '../Driver';
import { remote } from '../helpers/remote';
import { getSocket, waitSocket, waitSocketDisconnection } from '../helpers/server';

export async function refresh(this: Driver): Promise<void> {
  const handle = await this.getWindowHandle();
  const socket = getSocket(this.namespace, handle);

  await remote('refresh', { requireWindow: true, noWait: true }).call(this);

  if (socket) {
    let reconnected = false;

    const timestamp = performance.now();
    const closed = await waitSocketDisconnection(socket, this.socketTimeoutMs);
    const eta = this.socketTimeoutMs - (performance.now() - timestamp);

    if (closed && eta > 0) {
      reconnected = !!(await waitSocket(this.namespace, handle, eta));
    }

    if (!reconnected) {
      throw new errors.UnsupportedOperationError('connection was not established after page refresh');
    }
  }
}
