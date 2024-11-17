/// <reference lib="dom" />

import { io } from 'socket.io-client';
import { URL as URLShim } from 'url-shim';
import { Driver } from './Driver.js';
import { UnsupportedOperation } from './errors/UnsupportedOperation.js';
import { currentHandle, currentUDID, currentURL } from './helpers/instrumentation.js';

const driver = new Driver();

io(currentURL.origin + '/' + currentUDID, { path: new URLShim('./ws', currentURL).pathname, query: { handle: currentHandle } }).on('command', async ({ command, args }: { command: string; args: unknown[] }, callback: (data?: [error: unknown, data: unknown]) => void) => {
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
