import type { HtmlDriver } from '../Driver.js';

export async function getWindowHandles(this: HtmlDriver): Promise<string[]> {
  return this.remote.getSessions();
}
