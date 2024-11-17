import type { Driver } from '../Driver';

export function setWindow(this: Driver): void {
  this.topContext.focus();
}
