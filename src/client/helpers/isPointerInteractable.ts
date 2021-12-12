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

  const clientWidth = window.innerWidth || document.documentElement.clientWidth;
  const clientHeight = window.innerHeight || document.documentElement.clientHeight;

  return rect.x > 0 && rect.y > 0 && rect.bottom < clientHeight && rect.right < clientWidth;
}
