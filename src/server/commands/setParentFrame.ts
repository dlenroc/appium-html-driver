import type { HtmlDriver } from '../Driver';

export async function setParentFrame(this: HtmlDriver): Promise<void> {
  this.frames.splice(-1);
}
