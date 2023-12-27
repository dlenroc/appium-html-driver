import { fromWebDriverElement } from '../helpers/Element.js';

export function getCssProperty(name: string, elementId: string): string {
  const element = fromWebDriverElement(elementId);
  const style = window.getComputedStyle(element);
  return style.getPropertyValue(name);
}
