/// <reference lib="dom" />

import { io } from 'socket.io-client';
import { URL as URLShim } from 'url-shim';
import { Driver } from './Driver.js';
import { UnsupportedOperation } from './errors/UnsupportedOperation.js';

const driver = new Driver();

// @ts-expect-error - src can be undefined
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const url = new URLShim(document.currentScript?.src ?? '', location.href);
const path = new URLShim('./ws', url).pathname;
const udid = url.searchParams.get('udid')?.trim() || '<appium-html-driver-udid>';
const handle = url.searchParams.get('handle')?.trim() || '<appium-html-driver-handle>';
const type = window.top === window ? 'window' : 'frame';

io(url.origin + '/' + udid, { path, query: { handle, type } }).on('command', async ({ command, args }: { command: string; args: unknown[] }, callback: (data?: [error: unknown, data: unknown]) => void) => {
  try {
    if (command in driver && typeof driver[command as keyof typeof driver] === 'function') {
      const result = await (driver[command as keyof typeof driver] as (...args: unknown[]) => unknown)(...args);
      callback([null, result]);
      return;
    }

    throw UnsupportedOperation(`Unsupported command: ${command}`);
  } catch (cause) {
    const error = cause instanceof Error ? cause : Error(JSON.stringify(cause));

    callback([{ name: error.name, message: error.message, stack: error.stack }, null]);
  }
});
