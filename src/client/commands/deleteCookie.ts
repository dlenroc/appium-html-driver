import type { Driver } from '../Driver';

export function deleteCookie(this: Driver, name: string): void {
  this.setCookie({ name, value: '', expiry: 0 });
}
