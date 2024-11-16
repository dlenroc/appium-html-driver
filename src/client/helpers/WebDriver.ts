import type { Element as WebDriverElement } from '@appium/types';
import { WEB_ELEMENT_IDENTIFIER, fromWebDriverElement, toWebDriverElement } from './Element';

export function toWebDriver(value: unknown): unknown {
  return typeof value === 'object' ? JSON.parse(JSON.stringify(value, toWebDriverReplacer)) : value;
}

export function fromWebDriver(value: unknown): unknown {
  return typeof value === 'object' ? JSON.parse(JSON.stringify(value), fromWebDriverReplacer) : value;
}

function toWebDriverReplacer(_: string, value: unknown): unknown {
  if (value instanceof Node) {
    return toWebDriverElement(value);
  } else {
    return value;
  }
}

function fromWebDriverReplacer(_: string, value: unknown): unknown {
  if (value && typeof value === 'object' && WEB_ELEMENT_IDENTIFIER in value) {
    return fromWebDriverElement(value as WebDriverElement);
  } else {
    return value;
  }
}
