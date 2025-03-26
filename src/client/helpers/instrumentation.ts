import { URL as URLShim } from 'url-shim';
import { v4 as uuid } from 'uuid';

declare global {
  interface Window {
    APPIUM_HTML_DRIVER_UDID?: string;
    APPIUM_HTML_DRIVER_HANDLE?: string;
  }
}

export const INSTRUMENTATION_URL = new URLShim(
  document.currentScript?.getAttribute('src') ?? '',
  location.href
);

export const INSTRUMENTATION_UDID =
  INSTRUMENTATION_URL.searchParams.get('udid')?.trim() ||
  window.APPIUM_HTML_DRIVER_UDID ||
  uuid();

export const INSTRUMENTATION_HANDLE =
  INSTRUMENTATION_URL.searchParams.get('handle')?.trim() ||
  window.APPIUM_HTML_DRIVER_HANDLE ||
  uuid();

export function getHomeUrl(handle: string): URLShim {
  const url = new URLShim('./home', INSTRUMENTATION_URL);
  url.searchParams.set('udid', INSTRUMENTATION_UDID);
  url.searchParams.set('handle', handle);
  return url;
}
