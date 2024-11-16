import type { Driver } from '../Driver';

export function setUrl(this: Driver, url: string): void {
  window.location.href = url;
}
