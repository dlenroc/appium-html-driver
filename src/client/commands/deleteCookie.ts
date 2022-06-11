import { setCookie } from './setCookie';

export function deleteCookie(name: string): void {
  setCookie({ name, value: '', expiry: 0 });
}
