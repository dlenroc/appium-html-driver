import type { Driver } from '../Driver';

export function forward(this: Driver): void {
  window.history.forward();
}
