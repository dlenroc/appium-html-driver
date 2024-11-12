import type { NewWindow } from '@appium/types';
import { URL as URLShim } from 'url-shim';
import { v4 as uuid } from 'uuid';
import type { Driver } from '../Driver.js';
import { InvalidArgument } from '../errors/InvalidArgument.js';

export function createNewWindow(this: Driver, type: string): NewWindow {
  // @ts-expect-error - src can be undefined
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const url = new URLShim(document.currentScript?.src ?? '', location.href);
  const udid = url.searchParams.get('udid')?.trim()?.toLowerCase() || '<appium-html-driver-udid>';
  const handle = uuid();

  const targetURL = new URLShim('./home', url);
  targetURL.searchParams.set('udid', udid);
  targetURL.searchParams.set('handle', handle);

  if (type === 'tab') {
    window.open(targetURL.href, '', 'noopener');
  } else if (type === 'window') {
    window.open(targetURL.href, '', 'resizable,noopener');
  } else {
    throw InvalidArgument(`supported types are 'tab' and 'window', but got '${type}'`);
  }

  return { type, handle };
}
