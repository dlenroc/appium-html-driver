import type { HtmlDriver } from '../Driver.js';

// eslint-disable-next-line @typescript-eslint/require-await
export async function getTimeouts(this: HtmlDriver): Promise<Record<string, number>> {
  return {
    script: this.scriptTimeoutMs,
    implicit: this.implicitWaitMs,
    pageLoad: this.pageLoadTimeoutMs,
    command: this.newCommandTimeoutMs,
  };
}
