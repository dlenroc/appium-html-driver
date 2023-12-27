import { randomUUID } from 'crypto';
import express from 'express';
import fs from 'fs';
import type { RequestListener, Server as HttpServer } from 'http';
import type { AddressInfo } from 'net';
import path from 'path';
import type { Namespace, Socket } from 'socket.io';
import { Server } from 'socket.io';

const servers = new WeakMap<HttpServer, Server>();
const client = fs.readFileSync(
  path.resolve(new URL(import.meta.url + '/..').pathname, './client.js'),
  'utf8'
);

export function isWindow(socket: Socket): boolean {
  return socket.handshake.query.type === 'window';
}

export function getId(socket: Socket): string {
  const id = socket.handshake.query.id;
  return typeof id === 'string' ? id : socket.id;
}

export function getIds(namespace: Namespace): string[] {
  return [...namespace.sockets.values()].filter((socket) => socket.connected).map(getId);
}

export function getSocket(namespace: Namespace, id: string): Socket | null {
  for (const socket of namespace.sockets.values()) {
    if (socket.connected && getId(socket) === id) {
      return socket;
    }
  }

  return null;
}

export function getNamespace(server: HttpServer, udid: string): Namespace {
  let socketServer = servers.get(server);
  if (!socketServer) {
    socketServer = injectServer(server);
    servers.set(server, socketServer);
  }

  return socketServer.of(udid);
}

export function waitSocket(namespace: Namespace, id: string, timeout: number): Promise<Socket | null> {
  return new Promise((resolve) => {
    const socket = [...namespace.sockets.values()].find((socket) => socket.connected && getId(socket) === id);
    if (socket) {
      resolve(socket);
      return;
    }

    const timer = setTimeout(onTimeout, timeout);
    namespace.on('connection', onConnect);

    function onConnect(socket: Socket) {
      if (getId(socket) === id) {
        clearTimeout(timer);
        namespace.removeListener('connection', onConnect);
        resolve(socket);
      }
    }

    function onTimeout() {
      namespace.removeListener('connection', onConnect);
      resolve(null);
    }
  });
}

export function waitSocketDisconnection(socket: Socket, timeout: number): Promise<boolean> {
  return new Promise((resolve) => {
    if (socket.disconnected) {
      resolve(true);
      return;
    }

    const timer = setTimeout(onTimeout, timeout);
    socket.once('disconnect', onDisconnect);

    function onDisconnect() {
      clearTimeout(timer);
      resolve(true);
    }

    function onTimeout() {
      socket.removeListener('disconnect', onDisconnect);
      resolve(false);
    }
  });
}

function injectServer(server: HttpServer): Server {
  attachToServerRoute(
    server,
    '/appium-html-driver',
    express()
      .get('/home/:udid?/:handle?', (req, res) => {
        const udid = req.params.udid || 'main';
        const handle = req.params.handle || '';
        res.setHeader('Content-Type', 'text/html');
        res.end(`<script src="/appium-html-driver/js/${udid}/${handle}"></script>`);
      })
      .get('/js/:udid?/:handle?', (req, res) => {
        const address = server.address() as AddressInfo;
        const udid = req.params.udid || 'main';
        const handle = req.params.handle || randomUUID();
        const url = `${req.protocol}://${req.hostname}:${address.port}`;

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/javascript');

        let body = client;
        body = body.replace('<appium-html-driver-url>', url);
        body = body.replace('<appium-html-driver-udid>', udid);
        body = body.replace('<appium-html-driver-handle>', handle);

        res.end(body);
      })
  );

  return new Server(server, {
    path: '/appium-html-driver/ws',
    serveClient: false,
    cors: { origin: '*' },
    pingTimeout: 5000,
    pingInterval: 1000,
    maxHttpBufferSize: 10e6,
  });
}

function attachToServerRoute(server: HttpServer, prefix: string, listener: RequestListener): void {
  const listeners = server.listeners('request').slice(0);
  server.removeAllListeners('request');
  server.on('request', (req, res) => {
    const url = req.url!;
    if (url.startsWith(prefix)) {
      req.url = url.slice(prefix.length);
      listener(req, res);
    } else {
      for (let i = 0; i < listeners.length; i++) {
        listeners[i].call(server, req, res);
      }
    }
  });
}
