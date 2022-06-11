import { fromWebDriverElement } from '../helpers/Element';

export function getText(elementId: string): string {
  return fromWebDriverElement(elementId).innerText;
}
