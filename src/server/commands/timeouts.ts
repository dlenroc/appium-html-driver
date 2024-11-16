import { errors } from '@appium/base-driver';
import type { HtmlDriver } from '../Driver.js';

// eslint-disable-next-line @typescript-eslint/require-await
export async function timeouts(this: HtmlDriver, _type: string, _ms: number | string, script?: number, pageLoad?: number, implicit?: number): Promise<void> {
  if (script != null && script < 0) {
    throw new errors.InvalidArgumentError('timeouts.script: expected positive number, got ' + script);
  }

  if (pageLoad != null && pageLoad < 0) {
    throw new errors.InvalidArgumentError('timeouts.pageLoad: expected positive number, got ' + pageLoad);
  }

  if (implicit != null && implicit < 0) {
    throw new errors.InvalidArgumentError('timeouts.implicit: expected positive number, got ' + implicit);
  }

  this.scriptTimeoutMs = script ?? this.scriptTimeoutMs;
  this.pageLoadTimeoutMs = pageLoad ?? this.pageLoadTimeoutMs;
  this.implicitWaitMs = implicit ?? this.implicitWaitMs;
}
