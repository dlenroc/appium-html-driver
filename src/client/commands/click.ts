import scrollIntoView from 'scroll-into-view-if-needed';
import type { Driver } from '../Driver';
import { ElementNotInteractable } from '../Errors';
import { fromWebDriverElement } from '../helpers/Element';
import { isPointerInteractable } from '../helpers/isPointerInteractable';

export function click(this: Driver, elementId: string): void {
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
