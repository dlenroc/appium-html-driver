import cssesc from 'cssesc';
import { fromWebDriverElement } from './Element';

export function getElements(strategy: string, selector: string, context?: string): HTMLElement[] {
  const parent = context ? fromWebDriverElement(context) : document.documentElement;

  let elements: HTMLElement[] = [];

  switch (strategy) {
    case 'id':
      elements = Array.from(parent.querySelectorAll(`#${cssesc(selector, { isIdentifier: true })}`));
      break;
    case 'tag name':
      elements = Array.from(parent.querySelectorAll(cssesc(selector, { isIdentifier: true })));
      break;
    case 'link text':
      elements = getElements('xpath', `.//a[normalize-space()="${selector}"]`, context);
      break;
    case 'partial link text':
      elements = getElements('xpath', `.//a[contains(normalize-space(), "${selector}")]`, context);
      break;
    case 'css selector':
      elements = Array.from(parent.querySelectorAll(selector));
      break;
    case 'xpath':
      let result = document.evaluate(selector, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      let node: Node | null = null;
      for (let i = 0; i < result.snapshotLength; i++) {
        node = result.snapshotItem(i);
        if (node) {
          elements.push(node as HTMLElement);
        }
      }
      break;
  }

  return elements;
}
