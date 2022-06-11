import type { Rect } from '@appium/types';
import { setWindowRect } from './setWindowRect';

export function maximizeWindow(): Rect {
  const width = window.screen.availWidth;
  const height = window.screen.availHeight;

  // @ts-ignore
  const x = window.screen.availLeft || 0;

  // @ts-ignore
  const y = window.screen.availTop || 0;

  return setWindowRect(x, y, width, height);
}
