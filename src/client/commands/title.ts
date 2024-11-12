import type { Driver } from '../Driver';

export function title(this: Driver): string {
  return window.document.title;
}
