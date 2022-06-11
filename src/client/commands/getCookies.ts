import type { Cookie } from '@appium/types';

export function getCookies(): Cookie[] {
  return window.document.cookie.split('; ').map((cookie) => {
    const [name, value] = cookie.split('=');

    return {
      name: decodeURIComponent(name),
      value: decodeURIComponent(value),
    };
  });
}
