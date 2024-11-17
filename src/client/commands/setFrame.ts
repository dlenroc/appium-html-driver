import type { Element } from '@appium/types';
import type { Driver } from '../Driver.js';
import { InvalidArgument } from '../errors/InvalidArgument.js';
import { NoSuchFrame } from '../errors/NoSuchFrame.js';
import { fromWebDriverElement, WEB_ELEMENT_IDENTIFIER } from '../helpers/Element.js';

export function setFrame(this: Driver, id: null | number | string | Element): void {
  // switch to main frame
  if (id === null) {
    this.contexts = [window];
    return;
  }

  // switch to frame by index
  if (typeof id === 'number') {
    if (id < 0) {
      throw InvalidArgument(`index must be a non-negative integer`);
    }

    const frames = this.currentContext.frames;
    if (id >= frames.length) {
      throw NoSuchFrame(`frame with index ${id} does not exist`);
    }

    this.contexts.push(frames[id]);
    return;
  }

  // switch to frame by name
  if (typeof id === 'string') {
    const frames = this.currentContext.frames;
    for (let i = 0; i < frames.length; i++) {
      if (frames[i]?.name === id) {
        this.contexts.push(frames[i]);
        return;
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

    this.contexts.push(element.contentWindow!);
    return;
  }

  throw InvalidArgument(`invalid frame identifier: ${JSON.stringify(id)}`);
}
