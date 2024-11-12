import type { Cookie } from '@appium/types';
import type { Driver } from '../Driver.js';
import { NoSuchCookie } from '../errors/NoSuchCookie.js';

export function getCookie(this: Driver, name: string): Cookie {
  const cookies = this.getCookies();
  for (const cookie of cookies) {
    if (cookie.name === name) {
      return cookie;
    }
  }

  throw NoSuchCookie(`cookie with name '${name}' does not exist or it is not visible from javascript`);
}
