import type { Driver } from '../Driver';
import { fromWebDriverElement } from '../helpers/Element';

export function getProperty(this: Driver, name: string, elementId: string): string | null {
  const element = fromWebDriverElement(elementId);
  const result = element[name as keyof Element];
  return result == null ? null : String(result);
}
