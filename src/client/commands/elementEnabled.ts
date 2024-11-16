import type { Driver } from '../Driver.js';
import { fromWebDriverElement } from '../helpers/Element.js';

export function elementEnabled(this: Driver, elementId: string): boolean {
  const element = fromWebDriverElement(elementId);
  const supportedTags = ['BUTTON', 'FIELDSET', 'INPUT', 'OPTGROUP', 'OPTION', 'SELECT', 'TEXTAREA'];
  const isDisabled = ~supportedTags.indexOf(element.tagName) && element.hasAttribute('disabled');
  return !isDisabled;
}
