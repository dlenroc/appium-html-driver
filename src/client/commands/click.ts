import scrollIntoView from 'scroll-into-view-if-needed';
import { ElementNotInteractable } from '../errors/ElementNotInteractable';
import { fromWebDriverElement } from '../helpers/Element';
import { isPointerInteractable } from '../helpers/isPointerInteractable';

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
