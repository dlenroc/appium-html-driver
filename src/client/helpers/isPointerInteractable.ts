export function isPointerInteractable(element: HTMLElement): boolean {
  const window = element.ownerDocument?.defaultView;
  if (!window) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  const elementCenterX = rect.left + rect.width / 2;
  const elementCenterY = rect.top + rect.height / 2;

  const target = window.document.elementFromPoint(elementCenterX, elementCenterY);
  if (target !== element) {
    return false;
  }

  return true;
}
