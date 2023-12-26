import type { Element } from '@appium/types';
import type { HtmlDriver } from '../Driver';
import { remote } from '../helpers/remote';

export async function setFrame(this: HtmlDriver, id: null | number | string | Element): Promise<void> {
  const frame = (await remote('setFrame').call(this, id as any)) as any;

  if (frame) {
    this.frames.push(frame);
  } else {
    this.frames = [];
  }
}
