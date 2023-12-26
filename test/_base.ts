/// <reference path='../types/chai.d.ts'/>

import { ElementReference } from '@wdio/protocols/build/types';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiLike from 'chai-like';
import chaiThings from 'chai-things';
import { randomUUID } from 'crypto';
import http from 'http';
import { Browser as PlaywrightBrowser, BrowserContext, chromium, LaunchOptions } from 'playwright-chromium';
import { env } from 'process';
import { remote } from 'webdriverio';

let appium: WebdriverIO.Browser;
let context: BrowserContext;
let playwright: PlaywrightBrowser;

chai.use(chaiLike).use(chaiThings).use(chaiAsPromised).should();

const UDID = randomUUID();
export enum Mode { CDP, ODC }

export const ELEMENT_ID = 'element-6066-11e4-a52e-4f735466cecf';
export const NOT_EXISTING_ELEMENT = '00000000-0000-0000-0000-000000000000';
export const HOME_PAGE = `http://localhost:4723/appium-html-driver/home/${UDID}`;

export const MODE = Mode[env.MODE as keyof typeof Mode];
if (MODE === undefined) {
  throw new Error(`MODE environment should be 'CDP' or 'ODC'`);
}

export function startBrowser(options?: LaunchOptions): { driver: WebdriverIO.Browser } {
  before(async () => {
    options = options || {};
    if (MODE === Mode.CDP) {
      options.args = options.args || [];
      options.args.push('--remote-debugging-port=9222');
    }

    playwright = await chromium.launch(options);
  });

  beforeEach(async () => {
    appium = await remote({
      port: 4723,
      logLevel: 'silent',
      connectionRetryCount: 0,
      capabilities: <any>{
        platformName: 'html',
        'appium:automationName': 'html',
        'appium:debuggingAddress': MODE === Mode.CDP ? await getWebSocketDebuggerUrl(9222) : `odc://${UDID}/main`,
      },
    });

    context = await playwright.newContext({ viewport: null });
    const page = await context.newPage();
    await Promise.all([
      context.waitForEvent('page'),
      page.evaluate(`window.open('${HOME_PAGE}/main', '', 'resizable,noopener')`)
    ]);
    await page.close();

    if (MODE === Mode.ODC) {
      await waitWindow('main', false);
    } else {
      const handles = await appium.getWindowHandles();
      await appium.switchToWindow(handles[0]);
    }
  });

  afterEach(async () => {
    await appium?.deleteSession();
    await context.close();
  });

  after(async () => {
    await playwright.close();
  });

  return {
    driver: new Proxy(
      {},
      {
        get(target: {}, property: string, receiver: any): any {
          return Reflect.get(appium, property, receiver);
        },
      }
    ) as WebdriverIO.Browser,
  };
}

export async function inline(html: String): Promise<string[]> {
  const elements = await appium.executeScript(
    `
    document.documentElement.innerHTML = arguments[0];
    return [...document.querySelectorAll('[data-return]')];
    `,
    [html]
  );

  const matches = html.matchAll(/\/(js|home)\/(?<udid>.+?)\/(?<handle>.+?)(['"#])/g);
  for (const { groups } of matches) {
    if (groups?.handle) {
      await waitWindow(groups.handle);
    }
  }

  return elements.map((element: ElementReference) => element[ELEMENT_ID]);
}

async function waitWindow(handle: string, allowExtraHandles: boolean = true, timeout: number = 60 * 1e3): Promise<void> {
  async function connected(): Promise<boolean> {
    const handles = await appium.getWindowHandles();
    return (allowExtraHandles || handles.length === 1) && handles.includes(handle);
  }

  await appium.waitUntil(connected, {
    timeout,
    timeoutMsg: `no window with '${handle}' handle`,
  });
}

function getWebSocketDebuggerUrl(port: number): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${port}/json/version`, (resp) => {
      let data = '';
      resp.on('data', (chunk) => data += chunk);
      resp.on('end', () => resolve(JSON.parse(data).webSocketDebuggerUrl));
    }).on("error", (err) => reject(err));
  });
}
