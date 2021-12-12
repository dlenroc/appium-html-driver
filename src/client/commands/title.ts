import type { Driver } from '../Driver';

export function title(this: Driver): string {
  return this.topContext.document.title;
}
