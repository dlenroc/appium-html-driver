import type { Element as WebDriverElement } from '@appium/base-driver';
import { v4 as uuid } from 'uuid';
import { StaleElementReference } from '../Errors';

const ELEMENTS: Record<string, HTMLElement> = {};

export const WEB_ELEMENT_IDENTIFIER: 'element-6066-11e4-a52e-4f735466cecf' = 'element-6066-11e4-a52e-4f735466cecf';

export function fromWebDriverElement(id: string): HTMLElement {
  const element = ELEMENTS[id];
  if (!element || !element.isConnected) {
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