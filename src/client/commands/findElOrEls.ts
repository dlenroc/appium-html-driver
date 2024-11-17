import type { Element as WebDriverElement } from '@appium/types';
import type { Driver } from '../Driver.js';
import { toWebDriverElement, WEB_ELEMENT_IDENTIFIER } from '../helpers/Element.js';
import { getElement } from '../helpers/getElement.js';
import { getElements } from '../helpers/getElements.js';

export function findElOrEls(this: Driver, strategy: string, selector: string, mult: boolean, context?: string): WebDriverElement | WebDriverElement[] {
  context = context || toWebDriverElement(this.currentContext.document.documentElement)[WEB_ELEMENT_IDENTIFIER];

  if (mult) {
    return getElements(strategy, selector, context).map((element) => toWebDriverElement(element));
  } else {
    return toWebDriverElement(getElement(strategy, selector, context));
  }
}
