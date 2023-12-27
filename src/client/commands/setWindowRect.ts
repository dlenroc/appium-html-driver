import type { Rect } from '@appium/types';
import { InvalidArgument } from '../errors/InvalidArgument.js';
import { getWindowRect } from './getWindowRect.js';

export function setWindowRect(x?: number, y?: number, width?: number, height?: number): Rect {
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
      window.moveTo(x, y);
    }

    if (hasWidth && hasHeight) {
      window.resizeTo(width, height);
    }
  }

  return getWindowRect();
}
