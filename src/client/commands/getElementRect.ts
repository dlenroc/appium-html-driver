import type { Rect } from '@appium/types';
import { fromWebDriverElement } from '../helpers/Element';

export function getElementRect(elementId: string): Rect {
  const element = fromWebDriverElement(elementId);
  const rect = element.getBoundingClientRect();
  const width = Math.floor(rect.right - rect.left);
  const height = Math.floor(rect.bottom - rect.top);
  const x = Math.floor(window.scrollX + rect.left);
  const y = Math.floor(window.scrollY + rect.top);
  return { x, y, width, height };
}
