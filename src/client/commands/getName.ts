import { fromWebDriverElement } from '../helpers/Element.js';

export function getName(elementId: string): string {
  return fromWebDriverElement(elementId).tagName.toLowerCase();
}
