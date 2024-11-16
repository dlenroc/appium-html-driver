import type { Driver } from '../Driver.js';
import { JavaScriptError } from '../errors/JavaScriptError.js';
import { fromWebDriver, toWebDriver } from '../helpers/WebDriver.js';

export async function executeAsync(this: Driver, script: string, args: unknown[]): Promise<unknown> {
  args = args.map(fromWebDriver);

  const fn = new this.currentWindow.window.Function(script) as (...args: unknown[]) => unknown;

  try {
    return toWebDriver(await new Promise((resolve) => fn(...args, resolve)));
  } catch (e) {
    throw JavaScriptError(e instanceof Error ? e.message : JSON.stringify(e));
  }
}
