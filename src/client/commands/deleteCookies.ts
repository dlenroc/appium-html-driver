import type { Driver } from '../Driver.js';

export function deleteCookies(this: Driver): void {
  this.getCookies().forEach(({ name }) => this.deleteCookie(name));
}
