import type { Driver } from '../Driver';

export function refresh(this: Driver): void {
  this.topContext.location.reload();
}
