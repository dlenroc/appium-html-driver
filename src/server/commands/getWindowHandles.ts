import type { HtmlDriver } from '../Driver.js';

// eslint-disable-next-line @typescript-eslint/require-await
export async function getWindowHandles(this: HtmlDriver): Promise<string[]> {
  return [...new Set([...this.namespace.sockets.values()].map((it) => it.data.handle))];
}
