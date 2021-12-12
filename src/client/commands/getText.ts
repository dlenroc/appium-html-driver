import type { Driver } from '../Driver';
import { fromWebDriverElement } from '../helpers/Element';

export function getText(this: Driver, elementId: string): string {
  return fromWebDriverElement(elementId).innerText;
}
