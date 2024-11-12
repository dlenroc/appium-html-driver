import type { Driver } from '../Driver.js';

export function deleteCookie(this: Driver, name: string): void {
  this.setCookie({ name, value: '', expiry: 0 });
}
