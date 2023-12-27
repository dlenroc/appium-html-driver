import { fromWebDriverElement } from '../helpers/Element.js';

export function getText(elementId: string): string {
  return fromWebDriverElement(elementId).innerText;
}
