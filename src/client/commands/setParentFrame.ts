import type { Driver } from '../Driver';

export function setParentFrame(this: Driver): void {
  if (this.context !== this.topContext) {
    this.context = this.context.parent;
  }
}
