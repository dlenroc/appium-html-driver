import type { Driver } from '../Driver';

export function getPageSource(this: Driver): string {
  return this.context.document.documentElement.outerHTML;
}
