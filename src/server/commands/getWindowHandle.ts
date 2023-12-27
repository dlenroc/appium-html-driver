import { errors } from '@appium/base-driver';
import type { HtmlDriver } from '../Driver.js';

export async function getWindowHandle(this: HtmlDriver): Promise<string> {
  const handle = await this.remote.getSession();

  if (!handle) {
    throw new errors.NoSuchWindowError('no target window selected');
  }

  const handles = await this.getWindowHandles();
  if (!handles.includes(handle)) {
    throw new errors.NoSuchWindowError('target window already closed or not yet connected');
  }

  return handle;
}
