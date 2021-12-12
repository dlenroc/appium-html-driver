import type { Driver } from '../Driver';
import { fromWebDriverElement } from '../helpers/Element';

export function getCssProperty(this: Driver, name: string, elementId: string): string {
  const element = fromWebDriverElement(elementId);
  const style = this.context.getComputedStyle(element);
  return style.getPropertyValue(name);
}
