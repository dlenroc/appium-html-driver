import type { Driver } from '../Driver';
import { fromWebDriverElement } from '../helpers/Element';

export function getName(this: Driver, elementId: string): string {
  return fromWebDriverElement(elementId).tagName.toLowerCase();
}
