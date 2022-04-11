import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { v4 as uuid } from 'uuid';
import { active } from './commands/active';
import { back } from './commands/back';
import { clear } from './commands/clear';
import { click } from './commands/click';
import { closeWindow } from './commands/closeWindow';
import { createWindow } from './commands/createWindow';
import { deleteCookie } from './commands/deleteCookie';
import { deleteCookies } from './commands/deleteCookies';
import { elementDisplayed } from './commands/elementDisplayed';
import { elementEnabled } from './commands/elementEnabled';
import { elementSelected } from './commands/elementSelected';
import { execute } from './commands/execute';
import { executeAsync } from './commands/executeAsync';
import { findElOrEls } from './commands/findElOrEls';
import { forward } from './commands/forward';
import { getAttribute } from './commands/getAttribute';
import { getCookie } from './commands/getCookie';
import { getCookies } from './commands/getCookies';
import { getCssProperty } from './commands/getCssProperty';
import { getElementRect } from './commands/getElementRect';
import { getName } from './commands/getName';
import { getPageSource } from './commands/getPageSource';
import { getProperty } from './commands/getProperty';
import { getText } from './commands/getText';
import { getUrl } from './commands/getUrl';
import { getWindowRect } from './commands/getWindowRect';
import { maximizeWindow } from './commands/maximizeWindow';
import { refresh } from './commands/refresh';
import { setCookie } from './commands/setCookie';
import { setFrame } from './commands/setFrame';
import { setParentFrame } from './commands/setParentFrame';
import { setUrl } from './commands/setUrl';
import { setValue } from './commands/setValue';
import { setWindow } from './commands/setWindow';
import { setWindowRect } from './commands/setWindowRect';
import { title } from './commands/title';
import { UnknownCommand, UnknownError } from './Errors';

export class Driver {
  protected host: string;
  protected udid: string;
  protected socket: Socket;
  protected context: Window = window;
  protected topContext: Window = window;

  // WebDriver
  public setUrl = setUrl;
  public getUrl = getUrl;
  public back = back;
  public forward = forward;
  public refresh = refresh;
  public title = title;
  public closeWindow = closeWindow;
  public setWindow = setWindow;
  public setFrame = setFrame;
  public createWindow = createWindow;
  public setParentFrame = setParentFrame;
  public getWindowRect = getWindowRect;
  public setWindowRect = setWindowRect;
  public maximizeWindow = maximizeWindow;
  public active = active;
  public findElOrEls = findElOrEls;
  public elementSelected = elementSelected;
  public getAttribute = getAttribute;
  public getProperty = getProperty;
  public getCssProperty = getCssProperty;
  public getText = getText;
  public getName = getName;
  public getElementRect = getElementRect;
  public elementEnabled = elementEnabled;
  public elementDisplayed = elementDisplayed;
  public click = click;
  public clear = clear;
  public setValue = setValue;
  public getPageSource = getPageSource;
  public execute = execute;
  public executeAsync = executeAsync;
  public getCookies = getCookies;
  public getCookie = getCookie;
  public setCookie = setCookie;
  public deleteCookie = deleteCookie;
  public deleteCookies = deleteCookies;

  constructor(host: string, udid: string, id?: string) {
    this.host = host;
    this.udid = udid;

    this.socket = io(host + '/' + udid, {
      path: '/appium-html-driver/ws',
      query: {
        id: id || uuid(),
        type: window.top === window ? 'window' : 'frame',
      },
    });

    this.socket.on('command', async (request: any, callback: (data: any) => void) => {
      try {
        const { command, args, options } = request;
        const method = this[command as keyof Driver] as any;
        if (typeof method !== 'function') {
          throw UnknownCommand(command);
        }

        if (options.noWait) {
          callback({});
        }

        const result = await method.apply(this, args);

        if (!options.noWait) {
          callback({ result });
        }
      } catch (e) {
        const { name, message, stack } = e instanceof Error ? e : UnknownError(JSON.stringify(e));
        callback({ error: { name, message, stack } });
      }
    });
  }
}
