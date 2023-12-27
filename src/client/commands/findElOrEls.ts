import type { Element as WebDriverElement } from '@appium/types';
import { toWebDriverElement } from '../helpers/Element.js';
import { getElement } from '../helpers/getElement.js';
import { getElements } from '../helpers/getElements.js';

export function findElOrEls(strategy: string, selector: string, mult: boolean, context: string): WebDriverElement | WebDriverElement[] {
  if (mult) {
    return getElements(strategy, selector, context).map((element) => toWebDriverElement(element));
  } else {
    return toWebDriverElement(getElement(strategy, selector, context));
  }
}
