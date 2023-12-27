import { BaseDriver } from '@appium/base-driver';
import type {
  DefaultCreateSessionResult,
  DriverData,
  W3CDriverCaps,
} from '@appium/types';
import { URL } from 'url';
import { HtmlDriver } from '../Driver.js';
import { DevToolsDevice } from '../adapters/DevToolsDevice.js';
import { InstrumentedDevice } from '../adapters/InstrumentedDevice.js';
import { capabilitiesConstraints } from '../capabilitiesConstraints.js';
import { getNamespace } from '../helpers/server.js';

export async function createSession(
  this: HtmlDriver,
  w3cCaps1: W3CDriverCaps<typeof capabilitiesConstraints>,
  w3cCaps2?: W3CDriverCaps<typeof capabilitiesConstraints>,
  w3cCaps3?: W3CDriverCaps<typeof capabilitiesConstraints>,
  driverData?: DriverData[]
): Promise<DefaultCreateSessionResult<typeof capabilitiesConstraints>> {
  const session = await BaseDriver.prototype.createSession.call(
    this,
    w3cCaps1,
    w3cCaps2,
    w3cCaps3,
    driverData
  );

  const url = new URL(this.opts.debuggingAddress);

  if (url.protocol === 'ws:') {
    this.remote = new DevToolsDevice();
    await this.remote.open({ target: this.opts.debuggingAddress });
  } else if (url.protocol === 'odc:') {
    const matches = this.opts.debuggingAddress.match(
      /^odc:\/\/([^\/]+)\/?([^\/#?]+)/
    );
    if (!matches) {
      throw new Error(
        `Invalid odc debugging address: ${this.opts.debuggingAddress}`
      );
    }

    const udid = matches[1];
    const handle = matches[2];

    this.opts.udid = udid;

    // @ts-ignore `server` is a hidden property
    const namespace = getNamespace(this.server, udid);

    this.remote = new InstrumentedDevice();
    await this.remote.open({ socket: namespace.server, udid });

    if (handle) {
      await this.remote.setSession(handle);
    }
  } else {
    throw new Error(
      `Unsupported debugging protocol: ${url.protocol.slice(0, -1)}`
    );
  }

  return session;
}
