import { JavaScriptError } from '../errors/JavaScriptError.js';
import { fromWebDriver, toWebDriver } from '../helpers/WebDriver.js';

export async function executeAsync(script: string, args: unknown[]): Promise<unknown> {
  args = fromWebDriver(args);

  try {
    return toWebDriver(
      await new Promise<any>((resolve) => {
        return new Function(script)(...args, resolve);
      })
    );
  } catch (e) {
    throw JavaScriptError(e instanceof Error ? e.message : JSON.stringify(e));
  }
}
