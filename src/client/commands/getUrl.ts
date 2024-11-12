import type { Driver } from '../Driver';

export function getUrl(this: Driver): string {
  return window.location.href;
}
