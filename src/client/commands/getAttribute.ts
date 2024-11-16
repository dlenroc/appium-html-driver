import type { Driver } from '../Driver.js';
import { fromWebDriverElement } from '../helpers/Element.js';

export function getAttribute(this: Driver, name: string, elementId: string): string | null {
  return fromWebDriverElement(elementId).getAttribute(name);
}
