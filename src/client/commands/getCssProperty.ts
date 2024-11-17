import type { Driver } from '../Driver.js';
import { fromWebDriverElement } from '../helpers/Element.js';

export function getCssProperty(this: Driver, name: string, elementId: string): string {
  const element = fromWebDriverElement(elementId);
  const style = this.currentContext.getComputedStyle(element);
  return style.getPropertyValue(name);
}
