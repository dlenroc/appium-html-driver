import type { Rect } from '@appium/base-driver';
import type { Driver } from '../Driver';

export function maximizeWindow(this: Driver): Rect {
  const width = this.topContext.screen.availWidth;
  const height = this.topContext.screen.availHeight;

  // @ts-ignore
  const x = this.topContext.screen.availLeft || 0;

  // @ts-ignore
  const y = this.topContext.screen.availTop || 0;

  return this.setWindowRect(x, y, width, height);
}
