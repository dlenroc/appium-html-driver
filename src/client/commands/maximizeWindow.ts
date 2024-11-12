import type { Rect } from '@appium/types';
import type { Driver } from '../Driver.js';

export function maximizeWindow(this: Driver): Rect {
  const width = window.screen.availWidth;
  const height = window.screen.availHeight;
  return this.setWindowRect(0, 0, width, height);
}
