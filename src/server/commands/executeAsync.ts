import type { HtmlDriver } from '../Driver';
import { compile } from '../helpers/compile';

export async function executeAsync(this: HtmlDriver, script: string, args: unknown[]): Promise<unknown> {
  return this.executeRemoteCommand('executeAsync', await compile(script), args);
}
