import type { Driver } from '../Driver';

export function setUrl(this: Driver, url: string): void {
  this.topContext.location.href = url;
}
