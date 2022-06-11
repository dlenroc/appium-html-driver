import { fromWebDriverElement } from '../helpers/Element';
import { getElementRect } from './getElementRect';

export function elementDisplayed(elementId: string): boolean {
  const element = fromWebDriverElement(elementId);

  const style = element.ownerDocument.defaultView?.getComputedStyle(element);
  if (!style || style.visibility === 'hidden') {
    return false;
  }

  const rect = getElementRect(elementId);
  return rect.width > 0 && rect.height > 0;
}
