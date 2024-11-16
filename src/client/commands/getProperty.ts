import type { Driver } from '../Driver.js';
import { fromWebDriverElement } from '../helpers/Element.js';
import { toWebDriver } from '../helpers/WebDriver.js';

export function getProperty(this: Driver, name: string, elementId: string): string | null {
  const element = fromWebDriverElement(elementId);
  const result = toWebDriver(element[name as keyof Element]);
  return typeof result === 'string' ? result : JSON.stringify(result);
}
