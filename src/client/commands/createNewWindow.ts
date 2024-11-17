import type { NewWindow } from '@appium/types';
import { v4 as uuid } from 'uuid';
import type { Driver } from '../Driver.js';
import { InvalidArgument } from '../errors/InvalidArgument.js';
import { getHomeUrl } from '../helpers/instrumentation.js';

export function createNewWindow(this: Driver, type: string): NewWindow {
  const handle = uuid();
  const newPageHref = getHomeUrl(handle).href;

  if (type === 'tab') {
    this.topContext.open(newPageHref, '', 'noopener');
  } else if (type === 'window') {
    this.topContext.open(newPageHref, '', 'resizable,noopener');
  } else {
    throw InvalidArgument(`supported types are 'tab' and 'window', but got '${type}'`);
  }

  return { type, handle };
}
