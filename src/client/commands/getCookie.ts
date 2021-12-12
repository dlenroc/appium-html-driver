import type { Cookie } from '@appium/base-driver';
import type { Driver } from '../Driver';
import { NoSuchCookie } from '../Errors';

export function getCookie(this: Driver, name: string): Cookie {
  const cookies = this.getCookies();
  const cookie = cookies.find((cookie) => cookie.name === name);

  if (!cookie) {
    throw NoSuchCookie(`cookie with name '${name}' does not exist or it is not visible from javascript`);
  }

  return cookie;
}
