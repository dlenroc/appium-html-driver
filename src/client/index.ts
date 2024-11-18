/// <reference lib="dom" />

import { io } from 'socket.io-client';
import { URL as URLShim } from 'url-shim';
import { Driver } from './Driver.js';
import { UnsupportedOperation } from './errors/UnsupportedOperation.js';
import { INSTRUMENTATION_HANDLE, INSTRUMENTATION_UDID, INSTRUMENTATION_URL } from './helpers/instrumentation.js';
import * as osd from './OSD.js';

const driver = new Driver();

io(INSTRUMENTATION_URL.origin + '/' + INSTRUMENTATION_UDID, { path: new URLShim('./ws', INSTRUMENTATION_URL).pathname, query: { handle: INSTRUMENTATION_HANDLE } })
  .on('connect', () => osd.updateStatusText('connected'))
  .on('connect_error', (error) => osd.updateStatusText(`connection error: ${error.message}`))
  .on('disconnect', (reason) => osd.updateStatusText(`disconnected due to ${reason}`))
  .on('command', async ({ command, args }: { command: string; args: unknown[] }, callback: (data?: [error: unknown, data: unknown]) => void) => {
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
