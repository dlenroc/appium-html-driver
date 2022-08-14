import { errors } from '@appium/base-driver';
import type { NewWindow, NewWindowType } from '@appium/types';
import { networkInterfaces } from 'os';
import { InstrumentedDevice } from '../adapters/InstrumentedDevice';
import type { Driver } from '../Driver';
import { remote } from '../helpers/remote';
import { retrying } from '../helpers/retrying';

export async function createNewWindow(this: Driver, type: NewWindowType): Promise<NewWindow> {
  const isInstrumentedDevice = this.remote instanceof InstrumentedDevice;
  const context: Record<string, any> = {};

  if (isInstrumentedDevice) {
    // @ts-ignore `server` is a hidden property
    const port = this.server.address().port;
    const ip = Object.values(networkInterfaces())
      .flat()
      .find((i) => (i?.family === 'IPv4' || (i?.family as any) === 4) && !i?.internal)?.address;

    context.url = `http://${ip}:${port}/appium-html-driver/home/${this.opts.udid}`;
  }

  const windows = await this.getWindowHandles();
  const window = await remote('createNewWindow', { requireWindow: true, context }).call(this, type);

  await retrying({
    timeout: this.socketTimeoutMs,
    validate: (result?: boolean) => !!result === true,
    command: async () => {
      const handles = await this.getWindowHandles();

      if (!isInstrumentedDevice) {
        window.handle = handles.find((handle) => !windows.includes(handle)) as string;
      }

      if (!handles.includes(window.handle)) {
        throw new errors.UnsupportedOperationError('window creation confirmation not received');
      }

      return true;
    },
  });

  return window;
}
