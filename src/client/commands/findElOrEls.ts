import type { Element as WebDriverElement } from '@appium/types';
import { toWebDriverElement } from '../helpers/Element';
import { getElement } from '../helpers/getElement';
import { getElements } from '../helpers/getElements';

export function findElOrEls(strategy: string, selector: string, mult: boolean, context: string): WebDriverElement | WebDriverElement[] {
  if (mult) {
    return getElements(strategy, selector, context).map((element) => toWebDriverElement(element));
  } else {
    return toWebDriverElement(getElement(strategy, selector, context));
  }
}
