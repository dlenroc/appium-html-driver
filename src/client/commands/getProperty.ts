import { fromWebDriverElement } from '../helpers/Element';

export function getProperty(name: string, elementId: string): string | null {
  const element = fromWebDriverElement(elementId);
  const result = element[name as keyof Element];
  return result == null ? null : String(result);
}
