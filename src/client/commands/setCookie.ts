import type { Cookie } from '@appium/types';
import type { Driver } from '../Driver.js';
import { InvalidArgument } from '../errors/InvalidArgument.js';

export function setCookie(this: Driver, cookie: Cookie): void {
  if (!cookie.name) {
    throw InvalidArgument('cookie name is required');
  }

  let newCookie = `${encodeURIComponent(cookie.name)}=${encodeURIComponent(cookie.value)}`;

  if (cookie.path) {
    newCookie += '; Path=' + cookie.path;
  }

  if (cookie.domain) {
    newCookie += '; Domain=' + cookie.domain;
  }

  if (cookie.secure) {
    newCookie += '; Secure';
  }

  if (cookie.httpOnly) {
    newCookie += '; HttpOnly';
  }

  if (typeof cookie.expiry === 'number') {
    newCookie += '; Max-Age=' + cookie.expiry;
  }

  if (cookie.sameSite) {
    newCookie += '; SameSite=' + cookie.sameSite;
  }

  this.currentWindow.document.cookie = newCookie;
}
