import type { Driver } from '../Driver';

export function back(this: Driver): void {
  this.topContext.history.back();
}
