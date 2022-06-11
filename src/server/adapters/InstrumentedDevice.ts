import { errorFromW3CJsonCode, errors } from '@appium/base-driver';
import type { Namespace, Server } from 'socket.io';
import { getSocket } from '../helpers/server';
import { RemoteDevice } from './RemoteDevice';

export class InstrumentedDevice implements RemoteDevice {
  private sessionId!: string;
  private namespace!: Namespace;

  async open(options: { socket: Server; udid: string }): Promise<void> {
    this.namespace = options.socket.of(options.udid);
  }

  async close(): Promise<void> {
    this.namespace.disconnectSockets();
  }

  async getType(): Promise<'window' | 'frame'> {
    return (getSocket(this.namespace, this.sessionId)?.handshake?.query?.type as 'window' | 'frame' | null) || 'window';
  }

  async getSession(): Promise<string> {
    return this.sessionId;
  }

  async getSessions(): Promise<string[]> {
    return [...this.namespace.sockets.values()]
      .filter((socket) => socket.connected)
      .map((socket) => {
        const id = socket.handshake.query.id;
        return typeof id === 'string' ? id : socket.id;
      });
  }

  async setSession(sessionId: string): Promise<void> {
    this.sessionId = sessionId;
  }

  async execute(expression: string, options: { timeout?: number; noWait?: boolean }, args: any[]): Promise<any> {
    const connection = getSocket(this.namespace, this.sessionId)!;
    if (!connection?.connected) {
      throw new errors.NoSuchWindowError(`target window disconnected unexpectedly`);
    }

    return new Promise((resolve, reject) => {
      let finished = false;

      const timeout = setTimeout(onTimeout, options.timeout || 5000);
      connection.once('disconnect', onDisconnect);
      connection.emit('command', { expression, args, options }, (response: any) => onResponse(response.error, response.result));

      function onDisconnect() {
        finished = true;
        clearTimeout(timeout);
        reject(new errors.NoSuchWindowError('target window disconnected unexpectedly'));
      }

      function onTimeout() {
        finished = true;
        connection.removeListener('disconnect', onDisconnect);
        reject(new errors.TimeoutError(`script timeout exceeded`));
      }

      function onResponse(error: any, data: any) {
        if (finished) return;

        finished = true;
        clearTimeout(timeout);
        connection.removeListener('disconnect', onDisconnect);

        if (error) {
          reject(errorFromW3CJsonCode(error.name, error.message, error.stack));
        } else {
          resolve(data);
        }
      }
    });
  }
}
