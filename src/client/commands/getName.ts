import { fromWebDriverElement } from '../helpers/Element';

export function getName(elementId: string): string {
  return fromWebDriverElement(elementId).tagName.toLowerCase();
}
