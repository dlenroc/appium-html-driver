import type { Driver } from '../Driver';
import { ElementNotInteractable } from '../Errors';
import { fromWebDriverElement } from '../helpers/Element';
import { ATOMIC_TYPES, isEditableElement } from '../helpers/isEditableElement';

export function setValue(this: Driver, text: string, elementId: string): void {
  const element = fromWebDriverElement(elementId);
  const isFocused = this.context.document.activeElement === element;

  if (!isEditableElement(element)) {
    throw ElementNotInteractable('element is not editable');
  }

  if (element.isContentEditable) {
    let selection = this.context.getSelection();

    if (!isFocused) {
      element.focus();
      selection?.selectAllChildren(element);
      selection?.collapseToEnd();
    }

    if (selection?.rangeCount) {
      const node = this.context.document.createTextNode(text);
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(node);
      selection.collapseToEnd();
    } else {
      element.innerHTML += text;
    }

    return;
  }

  const tagName = element.tagName;
  const input = element as HTMLInputElement | HTMLTextAreaElement;

  if (!isFocused) {
    input.focus();

    if (typeof input.selectionStart === 'number') {
      input.selectionStart = input.selectionEnd = input.value.length;
    }
  }

  if (tagName === 'INPUT' && ATOMIC_TYPES.indexOf(input.type.toLowerCase()) !== -1) {
    input.value = text;
  } else {
    const value = input.value;
    const end = input.selectionEnd ?? value.length;
    const start = input.selectionStart ?? value.length;
    input.value = value.slice(0, start) + text + value.slice(end);
  }

  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
}
