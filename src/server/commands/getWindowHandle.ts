import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver';
import { getSocket } from '../helpers/server';

export async function getWindowHandle(this: Driver): Promise<string> {
  const handle = this.handle;
  if (!handle) {
    throw new errors.NoSuchWindowError('no target window selected');
  }

  const socket = getSocket(this.namespace, handle);
  if (!socket?.connected) {
    throw new errors.NoSuchWindowError('target window already closed or not yet connected');
  }

  return handle;
}
