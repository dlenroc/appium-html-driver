import type { Driver } from '../Driver';

export function deleteCookies(this: Driver): void {
  this.getCookies().forEach(({ name }) => this.deleteCookie(name));
}
