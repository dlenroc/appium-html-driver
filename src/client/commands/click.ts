import scrollIntoView from 'scroll-into-view-if-needed';
import { ElementNotInteractable } from '../errors/ElementNotInteractable.js';
import { fromWebDriverElement } from '../helpers/Element.js';
import { isPointerInteractable } from '../helpers/isPointerInteractable.js';

export function click(elementId: string): void {
  const element = fromWebDriverElement(elementId);

  scrollIntoView(element, {
    block: 'end',
    inline: 'nearest',
    scrollMode: 'if-needed',
  });

  if (!isPointerInteractable(element)) {
    throw ElementNotInteractable('element is not interactable');
  }

  element.click();
}
