import type { Driver } from '../Driver.js';
import { fromWebDriverElement } from '../helpers/Element.js';

export function getText(this: Driver, elementId: string): string {
  const element = fromWebDriverElement(elementId);
  return element.innerText ?? element.textContent ?? '';
}
