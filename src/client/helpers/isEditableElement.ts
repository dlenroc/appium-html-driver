export const TEXT_TYPES = ['text', 'search', 'url', 'tel', 'email', 'password', 'hidden'];
export const ATOMIC_TYPES = ['date', 'month', 'week', 'time', 'datetime-local', 'number', 'range', 'color', 'file'];

export function isEditableElement(element: HTMLElement): boolean {
  if (element.isContentEditable) {
    return true;
  }

  const tagName = element.tagName;
  if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
    return false;
  }

  const input = element as HTMLInputElement | HTMLTextAreaElement;
  if (input.disabled || input.readOnly) {
    return false;
  }

  if (tagName === 'TEXTAREA') {
    return true;
  }

  const type = input.type.toLowerCase();
  return TEXT_TYPES.indexOf(type) !== -1 || ATOMIC_TYPES.indexOf(type) !== -1;
}
