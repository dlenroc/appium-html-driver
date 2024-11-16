import type { Driver } from '../Driver';

export function switchToParentFrame(this: Driver): void {
  if (this.windows.length > 1) {
    this.windows.pop();
  }
}
