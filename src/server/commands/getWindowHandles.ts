import type { Driver } from '../Driver';

export async function getWindowHandles(this: Driver): Promise<string[]> {
  return this.remote.getSessions();
}
