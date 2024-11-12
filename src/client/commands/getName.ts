import type { Driver } from '../Driver.js';
import { fromWebDriverElement } from '../helpers/Element.js';

export function getName(this: Driver, elementId: string): string {
  return fromWebDriverElement(elementId).tagName.toLowerCase();
}
