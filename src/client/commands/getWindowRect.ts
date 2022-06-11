import type { Rect } from '@appium/types';

export function getWindowRect(): Rect {
  return {
    x: window.screenX,
    y: window.screenY,
    width: window.outerWidth,
    height: window.outerHeight,
  };
}
