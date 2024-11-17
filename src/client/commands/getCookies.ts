import type { Cookie } from '@appium/types';
import type { Driver } from '../Driver';

export function getCookies(this: Driver): Cookie[] {
  return this.currentContext.document.cookie.split('; ').map((cookie) => {
    const separatorIndex = cookie.indexOf('=');
    const name = cookie.slice(0, separatorIndex);
    const value = cookie.slice(separatorIndex + 1);

    return {
      name: decodeURIComponent(name),
      value: decodeURIComponent(value),
    };
  });
}
