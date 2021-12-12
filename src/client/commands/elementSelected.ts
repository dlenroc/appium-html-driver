import type { Driver } from '../Driver';
import { fromWebDriverElement } from '../helpers/Element';

export function elementSelected(this: Driver, elementId: string): boolean {
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
