import { errors } from '@appium/base-driver';
import type { HtmlDriver } from '../Driver.js';

// eslint-disable-next-line @typescript-eslint/require-await
export async function getWindowHandle(this: HtmlDriver): Promise<string> {
  const handle = this.opts.handle;
  if (!handle) {
    throw new errors.NoSuchWindowError('no target window selected');
  }

  if (!this.socket) {
    throw new errors.NoSuchWindowError('target window already closed or not yet connected');
  }

  return handle;
}
