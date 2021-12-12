import type { Driver } from '../Driver';

export function getUrl(this: Driver): string {
  return this.topContext.location.href;
}
