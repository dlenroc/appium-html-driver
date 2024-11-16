import type { HtmlDriver } from '../Driver';
import { compile } from '../helpers/compile';
import { remote } from '../helpers/remote';

export async function execute(this: HtmlDriver, script: string, args: unknown[]): Promise<unknown> {
  return remote('execute').call(this, await compile(script), args);
}
