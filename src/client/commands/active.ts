import type { Element } from '@appium/types';
import type { Driver } from '../Driver';
import { NoSuchElement } from '../Errors';
import { toWebDriverElement } from '../helpers/Element';

export function active(this: Driver): Element {
  const element = this.context.document.activeElement;

  if (!element) {
    throw NoSuchElement('no active element');
  }

  return toWebDriverElement(element);
}
