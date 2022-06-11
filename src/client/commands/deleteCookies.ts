import { deleteCookie } from './deleteCookie';
import { getCookies } from './getCookies';

export function deleteCookies(): void {
  getCookies().forEach(({ name }) => deleteCookie(name));
}
