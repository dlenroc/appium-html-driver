import type { Driver } from '../Driver';
import { getIds } from '../helpers/server';

export async function getWindowHandles(this: Driver): Promise<string[]> {
  return getIds(this.namespace);
}
