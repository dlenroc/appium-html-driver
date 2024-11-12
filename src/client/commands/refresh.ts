import type { Driver } from '../Driver';

export function refresh(this: Driver): void {
  window.location.reload();
}
