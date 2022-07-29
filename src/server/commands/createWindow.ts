/// <reference path='../../../types/appium-types.d.ts'/>

import { errors } from '@appium/base-driver';
import type { WindowHandle } from '@appium/types';
import { networkInterfaces } from 'os';
import { InstrumentedDevice } from '../adapters/InstrumentedDevice';
import type { Driver } from '../Driver';
import { remote } from '../helpers/remote';
import { retrying } from '../helpers/retrying';

export async function createWindow(this: Driver, type: string): Promise<WindowHandle> {
  const context: Record<string, any> = {};

  if (this.remote instanceof InstrumentedDevice) {
    // @ts-ignore `server` is a hidden property
    const port = this.server.address().port;
    const ip = Object.values(networkInterfaces())
      .flat()
      .find((i) => (i?.family === 'IPv4' || (i?.family as any) === 4) && !i?.internal)?.address;

    context.url = `http://${ip}:${port}/appium-html-driver/home/${this.opts.udid}`;
  }

  const window = await remote('createWindow', { requireWindow: true, context }).call(this, type);

  await retrying({
    timeout: this.socketTimeoutMs,
    validate: (result?: boolean) => !!result === true,
    command: async () => {
      const handles = await this.getWindowHandles();
      if (!handles.includes(window.handle)) {
        throw new errors.UnsupportedOperationError('window creation confirmation not received');
      }

      return true;
    },
  });

  return window;
}
