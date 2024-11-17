import type { Element } from '@appium/types';
import type { Driver } from '../Driver.js';
import { NoSuchElement } from '../errors/NoSuchElement.js';
import { toWebDriverElement } from '../helpers/Element.js';

export function active(this: Driver): Element {
  const element = this.currentContext.document.activeElement;

  if (!element) {
    throw NoSuchElement('no active element');
  }

  return toWebDriverElement(element);
}
