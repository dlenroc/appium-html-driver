import type { Driver } from '../Driver.js';
import { fromWebDriverElement } from '../helpers/Element.js';

export function elementDisplayed(this: Driver, elementId: string): boolean {
  const element = fromWebDriverElement(elementId);

  const style = element.ownerDocument.defaultView?.getComputedStyle(element);
  if (!style || style.visibility === 'hidden') {
    return false;
  }

  const rect = this.getElementRect(elementId);
  return rect.width > 0 && rect.height > 0;
}
