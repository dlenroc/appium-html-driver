import { fromWebDriverElement } from '../helpers/Element.js';

export function elementSelected(elementId: string): boolean {
  const element = fromWebDriverElement(elementId);
  const tagName = element.tagName;

  if (tagName === 'INPUT') {
    return (element as HTMLInputElement).checked;
  }

  if (tagName === 'OPTION') {
    return (element as HTMLOptionElement).selected;
  }

  return false;
}
