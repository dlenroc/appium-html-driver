import type { Driver } from '../Driver';

export function forward(this: Driver): void {
  this.topContext.history.forward();
}
