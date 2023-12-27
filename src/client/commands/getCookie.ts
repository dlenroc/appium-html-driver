import type { Cookie } from '@appium/types';
import { NoSuchCookie } from '../errors/NoSuchCookie.js';
import { getCookies } from './getCookies.js';

export function getCookie(name: string): Cookie {
  const cookies = getCookies();
  const cookie = cookies.find((cookie) => cookie.name === name);

  if (!cookie) {
    throw NoSuchCookie(`cookie with name '${name}' does not exist or it is not visible from javascript`);
  }

  return cookie;
}
