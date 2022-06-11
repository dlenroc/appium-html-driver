import { fromWebDriverElement } from '../helpers/Element';

export function getAttribute(name: string, elementId: string): string | null {
  return fromWebDriverElement(elementId).getAttribute(name);
}
