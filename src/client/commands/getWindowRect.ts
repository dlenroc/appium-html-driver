import type { Rect } from '@appium/base-driver';
import type { Driver } from '../Driver';

export function getWindowRect(this: Driver): Rect {
  return {
    x: this.topContext.screenX,
    y: this.topContext.screenY,
    width: this.topContext.outerWidth,
    height: this.topContext.outerHeight,
  };
}
