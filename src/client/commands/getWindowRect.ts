import type { Rect } from '@appium/types';
import type { Driver } from '../Driver';

export function getWindowRect(this: Driver): Rect {
  return {
    x: window.screenX,
    y: window.screenY,
    width: window.outerWidth,
    height: window.outerHeight,
  };
}
