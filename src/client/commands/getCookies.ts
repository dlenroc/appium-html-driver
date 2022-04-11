import type { Cookie } from '@appium/types';
import type { Driver } from '../Driver';

export function getCookies(this: Driver): Cookie[] {
  return this.context.document.cookie.split('; ').map((cookie) => {
    const [name, value] = cookie.split('=');

    return {
      name: decodeURIComponent(name),
      value: decodeURIComponent(value),
    };
  });
}
