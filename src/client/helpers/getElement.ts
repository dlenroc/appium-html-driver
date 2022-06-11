import cssesc from 'cssesc';
import { NoSuchElement } from '../errors/NoSuchElement';
import { fromWebDriverElement } from './Element';

export function getElement(strategy: string, selector: string, context?: string): HTMLElement {
  const parent = context ? fromWebDriverElement(context) : document.documentElement;

  let element: HTMLElement | null = null;

  switch (strategy) {
    case 'id':
      element = parent.querySelector(`#${cssesc(selector, { isIdentifier: true })}`);
      break;
    case 'tag name':
      element = parent.querySelector(cssesc(selector, { isIdentifier: true }));
      break;
    case 'link text':
      element = getElement('xpath', `.//a[normalize-space()="${selector}"]`, context);
      break;
    case 'partial link text':
      element = getElement('xpath', `.//a[contains(normalize-space(), "${selector}")]`, context);
      break;
    case 'css selector':
      element = parent.querySelector(selector);
      break;
    case 'xpath':
      element = document.evaluate(selector, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLElement;
      break;
  }

  if (!element) {
    throw NoSuchElement(`no element found using '${strategy}' strategy and '${selector}' selector`);
  }

  return element;
}
