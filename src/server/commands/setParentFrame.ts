import type { Driver } from '../Driver';

export async function setParentFrame(this: Driver): Promise<void> {
  this.frames.splice(-1);
}
