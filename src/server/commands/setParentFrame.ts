import type { HtmlDriver } from '../Driver.js';

export async function setParentFrame(this: HtmlDriver): Promise<void> {
  this.frames.splice(-1);
}
