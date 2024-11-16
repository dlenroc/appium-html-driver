import type { Driver } from '../Driver.js';
import { ElementNotInteractable } from '../errors/ElementNotInteractable.js';
import { fromWebDriverElement } from '../helpers/Element.js';
import { ATOMIC_TYPES, isEditableElement } from '../helpers/isEditableElement.js';

export function setValue(this: Driver, text: string | string[], elementId: string): void {
  text = Array.isArray(text) ? text.join('') : text;

  const element = fromWebDriverElement(elementId);
  const isFocused = this.currentWindow.document.activeElement === element;

  if (!isEditableElement(element)) {
    throw ElementNotInteractable('element is not editable');
  }

  if (element.isContentEditable) {
    const selection = this.currentWindow.getSelection();

    if (!isFocused) {
      element.focus();
      selection?.selectAllChildren(element);
      selection?.collapseToEnd();
    }

    if (selection?.rangeCount) {
      const node = this.currentWindow.document.createTextNode(text);
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

  if (tagName === 'INPUT' && ~ATOMIC_TYPES.indexOf(input.type.toLowerCase())) {
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
