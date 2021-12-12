import type { WindowHandle } from '@appium/base-driver';
import { v4 as uuid } from 'uuid';
import type { Driver } from '../Driver';
import { InvalidArgument } from '../Errors';

export function createWindow(this: Driver, type: string): WindowHandle {
  const handle = uuid();
  const url = `${this.host}/appium-html-driver/home/${this.udid}/${handle}`;

  if (type === 'tab') {
    this.topContext.open(url, '', 'noopener');
  } else if (type === 'window') {
    this.topContext.open(url, '', 'resizable,noopener');
  } else {
    throw InvalidArgument(`supported types are 'tab' and 'window', but got '${type}'`);
  }

  return { type, handle };
}
