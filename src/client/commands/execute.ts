import { JavaScriptError } from '../errors/JavaScriptError.js';
import { fromWebDriver, toWebDriver } from '../helpers/WebDriver.js';

export function execute(script: string, args: unknown[]): unknown {
  args = fromWebDriver(args);

  try {
    return toWebDriver(new Function(script)(...args));
  } catch (e) {
    throw JavaScriptError(e instanceof Error ? e.message : JSON.stringify(e));
  }
}
