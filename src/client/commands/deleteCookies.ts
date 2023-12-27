import { deleteCookie } from './deleteCookie.js';
import { getCookies } from './getCookies.js';

export function deleteCookies(): void {
  getCookies().forEach(({ name }) => deleteCookie(name));
}
