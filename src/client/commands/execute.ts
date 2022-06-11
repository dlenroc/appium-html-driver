import { cloneDeepWith, has, isElement } from 'lodash-es';
import { JavaScriptError } from '../errors/JavaScriptError';
import { fromWebDriverElement, toWebDriverElement, WEB_ELEMENT_IDENTIFIER } from '../helpers/Element';

export function execute(script: string, args: unknown[]): unknown {
  const normalizedArgs = cloneDeepWith(args, (value) => {
    if (has(value, WEB_ELEMENT_IDENTIFIER)) {
      return fromWebDriverElement(value[WEB_ELEMENT_IDENTIFIER]);
    }
  });

  try {
    let result = new Function(script)(...normalizedArgs);

    return cloneDeepWith(result, (value) => {
      if (isElement(value)) {
        return toWebDriverElement(value);
      }
    });
  } catch (e) {
    throw JavaScriptError(e instanceof Error ? e.message : JSON.stringify(e));
  }
}
