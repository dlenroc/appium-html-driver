import type { HtmlDriver } from '../Driver';
import { compile } from '../helpers/compile';

export async function execute(this: HtmlDriver, script: string, args: unknown[]): Promise<unknown> {
  return this.executeRemoteCommand('execute', await compile(script), args);
}
