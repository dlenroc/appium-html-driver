import type { BaseDriver } from '@appium/base-driver';
import type { Driver } from '../Driver';
import { getNamespace } from '../helpers/server';

export async function createSession(this: Driver, createSession: BaseDriver['createSession'], jwpCaps: {}, jwpReqCaps: {}, w3cCaps: {}): Promise<[string, {}]> {
  const session = await createSession(jwpCaps, jwpReqCaps, w3cCaps);
  const { udid, handle } = this.opts;

  this.handle = handle;
  this.namespace = getNamespace(this.server, `/${udid || 'main'}`);

  return session;
}
