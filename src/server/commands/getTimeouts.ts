import type { HtmlDriver } from '../Driver';

export async function getTimeouts(this: HtmlDriver): Promise<Record<string, number>> {
  return {
    script: this.scriptTimeoutMs,
    implicit: this.implicitWaitMs,
    pageLoad: this.pageLoadTimeoutMs,
    command: this.newCommandTimeoutMs,
  };
}
