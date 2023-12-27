import type { Element } from '@appium/types';
import { NoSuchElement } from '../errors/NoSuchElement.js';
import { toWebDriverElement } from '../helpers/Element.js';

export function active(): Element {
  const element = window.document.activeElement;

  if (!element) {
    throw NoSuchElement('no active element');
  }

  return toWebDriverElement(element);
}
