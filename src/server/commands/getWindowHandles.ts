import type { HtmlDriver } from '../Driver';

export async function getWindowHandles(this: HtmlDriver): Promise<string[]> {
  return this.remote.getSessions();
}
