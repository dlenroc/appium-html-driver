import type { Driver } from '../Driver';

export function switchToParentFrame(this: Driver): void {
  if (this.contexts.length > 1) {
    this.contexts.pop();
  }
}
