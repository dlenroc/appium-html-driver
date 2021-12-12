import type { Driver } from '../Driver';
import { fromWebDriverElement } from '../helpers/Element';

export function getAttribute(this: Driver, name: string, elementId: string): string | null {
  return fromWebDriverElement(elementId).getAttribute(name);
}
