import type { Rect } from '@appium/types';
import type { Driver } from '../Driver';
import { fromWebDriverElement } from '../helpers/Element';

export function getElementRect(this: Driver, elementId: string): Rect {
  const element = fromWebDriverElement(elementId);
  const { x, y, width, height } = element.getBoundingClientRect();
  const { scrollX, scrollY } = this.context;
  return { x: scrollX + x, y: scrollY + y, width, height };
}
