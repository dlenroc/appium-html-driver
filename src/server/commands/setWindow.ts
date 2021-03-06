import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver';
import { remote } from '../helpers/remote';

export async function setWindow(this: Driver, handle: string): Promise<void> {
  const handles = await this.getWindowHandles();
  if (!handles.includes(handle)) {
    throw new errors.NoSuchWindowError(`window with handle '${handle}' does not exist`);
  }

  await this.remote.setSession(handle);

  await remote('setWindow').call(this, handle);
}
