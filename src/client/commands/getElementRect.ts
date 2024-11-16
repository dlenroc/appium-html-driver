import type { Rect } from '@appium/types';
import type { Driver } from '../Driver.js';
import { fromWebDriverElement } from '../helpers/Element.js';

export function getElementRect(this: Driver, elementId: string): Rect {
  const element = fromWebDriverElement(elementId);
  const rect = element.getBoundingClientRect();
  const width = Math.floor(rect.right - rect.left);
  const height = Math.floor(rect.bottom - rect.top);
  const x = Math.floor(this.currentWindow.scrollX + rect.left);
  const y = Math.floor(this.currentWindow.scrollY + rect.top);
  return { x, y, width, height };
}
