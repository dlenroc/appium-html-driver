import type { NewWindow } from '@appium/types';
import { v4 as uuid } from 'uuid';
import { InvalidArgument } from '../errors/InvalidArgument';

export function createNewWindow(this: { url?: string }, type: string): NewWindow {
  const handle = uuid();
  const url = this.url ? this.url + '/' + handle : 'about:blank#' + handle;

  if (type === 'tab') {
    window.open(url, '', 'noopener');
  } else if (type === 'window') {
    window.open(url, '', 'resizable,noopener');
  } else {
    throw InvalidArgument(`supported types are 'tab' and 'window', but got '${type}'`);
  }

  return { type, handle };
}
