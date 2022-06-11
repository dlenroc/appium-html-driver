import { fromWebDriverElement } from '../helpers/Element';

export function getCssProperty(name: string, elementId: string): string {
  const element = fromWebDriverElement(elementId);
  const style = window.getComputedStyle(element);
  return style.getPropertyValue(name);
}
