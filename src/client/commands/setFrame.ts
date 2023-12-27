import type { Element } from '@appium/types';
import { InvalidArgument } from '../errors/InvalidArgument.js';
import { NoSuchFrame } from '../errors/NoSuchFrame.js';
import { fromWebDriverElement, toWebDriverElement, WEB_ELEMENT_IDENTIFIER } from '../helpers/Element.js';

export function setFrame(id: null | number | string | Element): any {
  // switch to main frame
  if (id === null) {
    return null;
  }

  // switch to frame by index
  if (typeof id === 'number') {
    if (id < 0) {
      throw InvalidArgument(`index must be a non-negative integer`);
    }

    const frames = window.frames;
    if (id >= frames.length) {
      throw NoSuchFrame(`frame with index ${id} does not exist`);
    }

    return toWebDriverElement(frames[id].frameElement as unknown as HTMLElement);
  }

  // switch to frame by name
  if (typeof id === 'string') {
    const frames = window.frames;
    for (let i = 0; i < frames.length; i++) {
      if (frames[i].name === id) {
        return toWebDriverElement(frames[i].frameElement as unknown as HTMLElement);
      }
    }

    throw NoSuchFrame(`frame with name ${id} does not exist`);
  }

  // switch to frame by element
  if (typeof id === 'object' && id[WEB_ELEMENT_IDENTIFIER]) {
    const element = fromWebDriverElement(id[WEB_ELEMENT_IDENTIFIER]) as HTMLIFrameElement;
    if (element.tagName !== 'IFRAME') {
      throw NoSuchFrame(`element is not a frame`);
    }

    return toWebDriverElement(element);
  }

  throw InvalidArgument(`invalid frame identifier: ${id}`);
}
