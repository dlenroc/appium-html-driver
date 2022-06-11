import { fromWebDriverElement } from '../helpers/Element';

export function elementEnabled(elementId: string): boolean {
  const element = fromWebDriverElement(elementId);
  const supportedTags = ['BUTTON', 'FIELDSET', 'INPUT', 'OPTGROUP', 'OPTION', 'SELECT', 'TEXTAREA'];
  const isDisabled = supportedTags.includes(element.tagName) && element.hasAttribute('disabled');
  return !isDisabled;
}
