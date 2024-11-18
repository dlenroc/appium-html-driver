import { URL as URLShim } from 'url-shim';

// @ts-expect-error - src can be undefined
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const INSTRUMENTATION_URL = new URLShim(document.currentScript?.src ?? '', location.href);
export const INSTRUMENTATION_UDID = INSTRUMENTATION_URL.searchParams.get('udid')?.trim() || '<appium-html-driver-udid>';
export const INSTRUMENTATION_HANDLE = INSTRUMENTATION_URL.searchParams.get('handle')?.trim() || '<appium-html-driver-handle>';

export function getHomeUrl(handle: string): URLShim {
  const url = new URLShim('./home', INSTRUMENTATION_URL);
  url.searchParams.set('udid', INSTRUMENTATION_UDID);
  url.searchParams.set('handle', handle);
  return url;
}
