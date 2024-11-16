import type { Driver } from '../Driver';

export function back(this: Driver): void {
  window.history.back();
}
