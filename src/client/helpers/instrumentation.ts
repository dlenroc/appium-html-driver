import { URL as URLShim } from 'url-shim';

// @ts-expect-error - src can be undefined
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const currentURL = new URLShim(document.currentScript?.src ?? '', location.href);
export const currentUDID = currentURL.searchParams.get('udid')?.trim() || '<appium-html-driver-udid>';
export const currentHandle = currentURL.searchParams.get('handle')?.trim() || '<appium-html-driver-handle>';

export function getHomeUrl(handle: string): URLShim {
  const url = new URLShim('./home', currentURL);
  url.searchParams.set('udid', currentUDID);
  url.searchParams.set('handle', handle);
  return url;
}
