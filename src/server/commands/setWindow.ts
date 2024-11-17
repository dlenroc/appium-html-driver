import { errors } from '@appium/base-driver';
import type { HtmlDriver } from '../Driver.js';

export async function setWindow(this: HtmlDriver, handle: string): Promise<void> {
  const handles = await this.getWindowHandles();
  if (!handles.includes(handle)) {
    throw new errors.NoSuchWindowError(`window with handle '${handle}' does not exist`);
  }

  this.opts.handle = handle;

  await this.executeRemoteCommand('setWindow');
}
