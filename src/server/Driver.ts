import { BaseDriver } from '@appium/base-driver';
import type { Element, ExternalDriver } from '@appium/types';
import { RemoteDevice } from './adapters/RemoteDevice';
import { closeWindow } from './commands/closeWindow';
import { createSession } from './commands/createSession';
import { createNewWindow } from './commands/createNewWindow';
import { getTimeouts } from './commands/getTimeouts';
import { getWindowHandle } from './commands/getWindowHandle';
import { getWindowHandles } from './commands/getWindowHandles';
import { setFrame } from './commands/setFrame';
import { setParentFrame } from './commands/setParentFrame';
import { setWindow } from './commands/setWindow';
import { timeouts } from './commands/timeouts';
import { remote } from './helpers/remote';
import { capabilitiesConstraints } from './capabilitiesConstraints';

export class HtmlDriver
  extends BaseDriver<typeof capabilitiesConstraints>
  implements ExternalDriver<typeof capabilitiesConstraints>
{
  static newMethodMap = {
    '/session/:sessionId/frame/parent': {
      POST: { command: 'setParentFrame' },
    },
  };

  // Connections
  protected remote!: RemoteDevice;
  protected frames: Element[] = [];

  // Configurations
  public implicitWaitMs = 0;
  public scriptTimeoutMs = 30000;
  public pageLoadTimeoutMs = 300000;
  public newCommandTimeoutMs = 60000;
  public socketTimeoutMs = 15000;
  public desiredCapConstraints = capabilitiesConstraints;
  public locatorStrategies = [
    'id',
    'tag name',
    'link text',
    'partial link text',
    'css selector',
    'xpath',
  ];

  // WebDriver Commands
  public createSession = createSession;
  public getTimeouts = getTimeouts;
  // @ts-ignore w3c command
  public timeouts = timeouts;
  public setUrl = remote('setUrl', { requireWindow: true, noWait: true });
  public getUrl = remote('getUrl', { requireWindow: true });
  public back = remote('back', { requireWindow: true, noWait: true });
  public forward = remote('forward', { requireWindow: true, noWait: true });
  public refresh = remote('refresh', { requireWindow: true, noWait: true });
  public title = remote('title', { requireWindow: true });
  public getWindowHandle = getWindowHandle;
  public closeWindow = closeWindow;
  public createNewWindow = createNewWindow;
  public setWindow = setWindow;
  public getWindowHandles = getWindowHandles;
  public setFrame = setFrame;
  public setParentFrame = setParentFrame;
  public getWindowRect = remote('getWindowRect', { requireWindow: true });
  public setWindowRect = remote('setWindowRect', { requireWindow: true });
  public maximizeWindow = remote('maximizeWindow', { requireWindow: true });
  public active = remote('active');
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
  public execute = remote('execute');
  public executeAsync = remote('executeAsync');
  public getCookies = remote('getCookies');
  public getCookie = remote('getCookie');
  public setCookie = remote('setCookie');
  public deleteCookie = remote('deleteCookie');
  public deleteCookies = remote('deleteCookies');
}
