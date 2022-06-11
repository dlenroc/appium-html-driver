import type { Element } from '@appium/types';
import type { Driver } from '../Driver';
import { remote } from '../helpers/remote';

export async function setFrame(this: Driver, id: null | number | string | Element): Promise<void> {
  const frame = (await remote('setFrame').call(this, id as any)) as any;

  if (frame) {
    this.frames.push(frame);
  } else {
    this.frames = [];
  }
}
