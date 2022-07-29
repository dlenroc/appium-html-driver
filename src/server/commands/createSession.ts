import type { ExternalDriver } from '@appium/types';
import { URL } from 'url';
import { DevToolsDevice } from '../adapters/DevToolsDevice';
import { InstrumentedDevice } from '../adapters/InstrumentedDevice';
import type { Driver } from '../Driver';
import { getNamespace } from '../helpers/server';

export async function createSession(this: Driver, createSession: ExternalDriver['createSession'], jwpCaps: any, jwpReqCaps: any, w3cCaps: any): Promise<[string, {}]> {
  const session = await createSession(jwpCaps, jwpReqCaps, w3cCaps);
  const url = new URL(this.opts.debuggingAddress);

  if (url.protocol === 'ws:') {
    this.remote = new DevToolsDevice();
    await this.remote.open({ target: this.opts.debuggingAddress });
  } else if (url.protocol === 'odc:') {
    const matches = this.opts.debuggingAddress.match(/^odc:\/\/([^\/]+)\/?([^\/#?]+)/);
    if (!matches) {
      throw new Error(`Invalid odc debugging address: ${this.opts.debuggingAddress}`);
    }

    this.opts.udid = matches[1];
    this.opts.handle = matches[2];

    // @ts-ignore `server` is a hidden property
    const namespace = getNamespace(this.server, this.opts.udid);

    this.remote = new InstrumentedDevice();
    await this.remote.open({ socket: namespace.server, udid: this.opts.udid });

    if (this.opts.handle) {
      await this.remote.setSession(this.opts.handle);
    }
  } else {
    throw new Error(`Unsupported debugging protocol: ${url.protocol.slice(0, -1)}`);
  }

  return session;
}
