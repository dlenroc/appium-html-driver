import type { Driver } from '../Driver';

export function closeWindow(this: Driver): void {
  this.topContext.close();
}
