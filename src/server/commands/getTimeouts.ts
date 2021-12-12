import type { Driver } from '../Driver';

export async function getTimeouts(this: Driver): Promise<Record<string, number>> {
  return {
    script: this.scriptTimeoutMs,
    implicit: this.implicitWaitMs,
    pageLoad: this.pageLoadTimeoutMs,
    command: this.newCommandTimeoutMs,
  };
}
