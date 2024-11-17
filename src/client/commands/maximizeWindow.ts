import type { Rect } from '@appium/types';
import type { Driver } from '../Driver.js';

export function maximizeWindow(this: Driver): Rect {
  const width = this.topContext.screen.availWidth;
  const height = this.topContext.screen.availHeight;
  return this.setWindowRect(0, 0, width, height);
}
