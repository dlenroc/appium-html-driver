import type { Element as WebDriverElement } from '@appium/types';
import { v4 as uuid } from 'uuid';
import { StaleElementReference } from '../errors/StaleElementReference';

// @ts-ignore
const ELEMENTS: Record<string, HTMLElement> = window.APPIUM_HTML_DRIVER_ELEMENTS || (window.APPIUM_HTML_DRIVER_ELEMENTS = {});

export const WEB_ELEMENT_IDENTIFIER: 'element-6066-11e4-a52e-4f735466cecf' = 'element-6066-11e4-a52e-4f735466cecf';

export function fromWebDriverElement(id: string | WebDriverElement): HTMLElement {
  const element = ELEMENTS[typeof id === 'string' ? id : id[WEB_ELEMENT_IDENTIFIER]];
  if (!element || !element.ownerDocument.contains(element)) {
    throw StaleElementReference(`element is no longer attached to the DOM or belongs to another window`);
  }

  return element;
}

export function toWebDriverElement(element: Element): WebDriverElement {
  for (const [id, candidate] of Object.entries(ELEMENTS)) {
    if (candidate === element) {
      return { [WEB_ELEMENT_IDENTIFIER]: id };
    }
  }

  const id = uuid();
  ELEMENTS[id] = element as HTMLElement;
  return { [WEB_ELEMENT_IDENTIFIER]: id };
}
