import { cloneDeepWith, has, isElement } from 'lodash-es';
import type { Driver } from '../Driver';
import { JavaScriptError } from '../Errors';
import { fromWebDriverElement, toWebDriverElement, WEB_ELEMENT_IDENTIFIER } from '../helpers/Element';

export async function executeAsync(this: Driver, script: string, args: unknown[]): Promise<unknown> {
  const normalizedArgs = cloneDeepWith(args, (value) => {
    if (has(value, WEB_ELEMENT_IDENTIFIER)) {
      return fromWebDriverElement(value[WEB_ELEMENT_IDENTIFIER]);
    }
  });

  try {
    let result = await new Promise<any>((resolve) => {
      return new Function(script)(...normalizedArgs, resolve);
    });

    return cloneDeepWith(result, (value) => {
      if (isElement(value)) {
        return toWebDriverElement(value);
      }
    });
  } catch (e) {
    throw JavaScriptError(e instanceof Error ? e.message : JSON.stringify(e));
  }
}
