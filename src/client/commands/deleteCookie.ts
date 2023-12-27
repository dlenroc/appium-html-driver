import { setCookie } from './setCookie.js';

export function deleteCookie(name: string): void {
  setCookie({ name, value: '', expiry: 0 });
}
