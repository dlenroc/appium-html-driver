import type { Rect } from '@appium/types';
import { fromWebDriverElement } from '../helpers/Element';

export function getElementRect(elementId: string): Rect {
  const element = fromWebDriverElement(elementId);
  const { x, y, width, height } = element.getBoundingClientRect();
  const { scrollX, scrollY } = window;
  return { x: scrollX + x, y: scrollY + y, width, height };
}
