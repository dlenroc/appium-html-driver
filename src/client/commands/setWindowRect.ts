import type { Rect } from '@appium/types';
import type { Driver } from '../Driver';
import { InvalidArgument } from '../Errors';

export function setWindowRect(this: Driver, x?: number, y?: number, width?: number, height?: number): Rect {
  const hasX = typeof x === 'number';
  const hasY = typeof y === 'number';
  const hasWidth = typeof width === 'number';
  const hasHeight = typeof height === 'number';

  if (hasWidth && width < 0) {
    throw InvalidArgument(`width must be a positive number, but got ${width}`);
  }

  if (hasHeight && height < 0) {
    throw InvalidArgument(`height must be a positive number, but got ${height}`);
  }

  for (let i = 0; i < 3; i++) {
    if (hasX && hasY) {
      this.topContext.moveTo(x, y);
    }

    if (hasWidth && hasHeight) {
      this.topContext.resizeTo(width, height);
    }
  }

  return this.getWindowRect();
}
