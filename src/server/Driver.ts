import { BaseDriver } from '@appium/base-driver';
import { logger } from '@appium/support';
import type { ExternalDriver } from '@appium/types';
import type { Application, Request } from 'express';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import type { Server as HttpServer } from 'node:http';
import path from 'node:path';
import { getClientIp } from 'request-ip';
import type { DefaultEventsMap } from 'socket.io';
import { Server } from 'socket.io';
import { capabilitiesConstraints } from './capabilitiesConstraints.js';
import { closeWindow } from './commands/closeWindow.js';
import { createNewWindow } from './commands/createNewWindow.js';
import { execute } from './commands/execute.js';
import { executeAsync } from './commands/executeAsync.js';
import { getTimeouts } from './commands/getTimeouts.js';
import { getWindowHandle } from './commands/getWindowHandle.js';
import { getWindowHandles } from './commands/getWindowHandles.js';
import { executeRemoteCommand } from './commands/internal/executeRemoteCommand.js';
import { setWindow } from './commands/setWindow.js';
import { timeouts } from './commands/timeouts.js';
import { remote } from './helpers/remote.js';

export class HtmlDriver extends BaseDriver<typeof capabilitiesConstraints> implements ExternalDriver<typeof capabilitiesConstraints> {
  private static IO: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, { handle: string }>;

  static async updateServer(app: Application, server: HttpServer) {
    const log = logger.getLogger('HtmlDriver-Server');
    const client = await fs.readFile(path.resolve(new URL(import.meta.url + '/..').pathname, './client.js'), 'utf8');

    function getParams(req: Request) {
      const handle =
        (typeof req.query.handle === 'string' ? req.query.handle.trim() : '') ||
        randomUUID();

      const udid =
        (typeof req.query.udid === 'string' ? req.query.udid.trim() : '') ||
        getClientIp(req) ||
        randomUUID();

      return { handle, udid };
    }

    app
      .get('/appium-html-driver/home', (req, res) => {
        const qs = new URLSearchParams(getParams(req));
        
        res.setHeader('Content-Type', 'text/html');
        res.end(`<script type="text/javascript" src="./js?${qs}"></script>`);
      })
      .get('/appium-html-driver/js', (req, res) => {
        const { handle, udid } = getParams(req);
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Content-Type', 'text/javascript');
        res.send(
          client
            .replace(/\bwindow.APPIUM_HTML_DRIVER_UDID\b/g, JSON.stringify(udid))
            .replace(/\bwindow.APPIUM_HTML_DRIVER_HANDLE\b/g, JSON.stringify(handle))
        );
      });

    HtmlDriver.IO = new Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, { handle: string }>(server, {
      path: '/appium-html-driver/ws',
      serveClient: false,
      cors: { origin: '*' },
      pingTimeout: 5000,
      pingInterval: 1000,
      maxHttpBufferSize: 10e6,
    });

    HtmlDriver.IO.of(/.*/).on('connection', (socket) => {
      const udid = socket.nsp.name.slice(1);

      if (!socket.recovered) {
        socket.data.handle = typeof socket.handshake.query.handle === 'string' ? socket.handshake.query.handle.trim() : randomUUID();
      }

      log.info('Socket "%s" (%s) connected to "%s"', socket.data.handle, socket.id, udid);

      socket.once('disconnect', (reason) => {
        log.info('Socket "%s" (%s) disconnected from "%s": %s', socket.data.handle, socket.id, udid, reason);
      });
    });
  }

  // Connections
  protected get namespace() {
    return HtmlDriver.IO.of(this.opts.udid);
  }

  protected get socket() {
    return [...(this.namespace?.sockets.values() ?? [])].findLast((it) => it.data.handle === this.opts.handle);
  }

  // Configurations
  public implicitWaitMs = 0;
  public scriptTimeoutMs = 30000;
  public pageLoadTimeoutMs = 300000;
  public newCommandTimeoutMs = 60000;
  public socketTimeoutMs = 15000;
  public desiredCapConstraints = capabilitiesConstraints;
  public locatorStrategies = ['id', 'tag name', 'link text', 'partial link text', 'css selector', 'xpath'];

  // Internal
  protected executeRemoteCommand = executeRemoteCommand;

  // WebDriver Commands
  public getTimeouts = getTimeouts;
  public timeouts = timeouts;
  public setUrl = remote('setUrl');
  public getUrl = remote('getUrl');
  public back = remote('back');
  public forward = remote('forward');
  public refresh = remote('refresh');
  public title = remote('title');
  public getWindowHandle = getWindowHandle;
  public closeWindow = closeWindow;
  public createNewWindow = createNewWindow;
  public setWindow = setWindow;
  public getWindowHandles = getWindowHandles;
  public setFrame = remote('setFrame');
  public switchToParentFrame = remote('switchToParentFrame');
  public getWindowRect = remote('getWindowRect');
  public setWindowRect = remote('setWindowRect');
  public maximizeWindow = remote('maximizeWindow');
  public active = remote('active');
  // @ts-expect-error - improve typing
  public findElOrEls = remote('findElOrEls');
  public elementSelected = remote('elementSelected');
  public getAttribute = remote('getAttribute');
  public getProperty = remote('getProperty');
  public getCssProperty = remote('getCssProperty');
  public getText = remote('getText');
  public getName = remote('getName');
  public getElementRect = remote('getElementRect');
  public elementEnabled = remote('elementEnabled');
  public elementDisplayed = remote('elementDisplayed');
  public click = remote('click');
  public clear = remote('clear');
  public setValue = remote('setValue');
  public getPageSource = remote('getPageSource');
  public execute = execute;
  public executeAsync = executeAsync;
  public getCookies = remote('getCookies');
  public getCookie = remote('getCookie');
  public setCookie = remote('setCookie');
  public deleteCookie = remote('deleteCookie');
  public deleteCookies = remote('deleteCookies');
}
