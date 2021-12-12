import type { Driver } from '../Driver';
import { InvalidElementState } from '../Errors';
import { fromWebDriverElement } from '../helpers/Element';
import { isEditableElement } from '../helpers/isEditableElement';

export function clear(this: Driver, elementId: string): void {
  const element = fromWebDriverElement(elementId);

  if (!isEditableElement(element)) {
    throw InvalidElementState('element is not editable');
  }

  if (element.isContentEditable) {
    if (element.innerHTML !== '') {
      element.focus();
      element.innerHTML = '';
      element.blur();
    }

    return;
  }

  const input = element as HTMLInputElement | HTMLTextAreaElement;
  if (input.value) {
    input.focus();
    input.value = '';
    input.blur();
  }
}
