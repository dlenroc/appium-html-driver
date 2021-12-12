/// <reference path='../types/chai.d.ts'/>

import { ElementReference } from '@wdio/protocols/build/types';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiLike from 'chai-like';
import chaiThings from 'chai-things';
import { Browser as PlaywrightBrowser, BrowserContext, chromium, LaunchOptions } from 'playwright-chromium';
import { v4 as uuid } from 'uuid';
import { Browser, remote } from 'webdriverio';

let appium: Browser<'async'>;
let context: BrowserContext;
let playwright: PlaywrightBrowser;

chai.use(chaiLike).use(chaiThings).use(chaiAsPromised).should();

const UDID = uuid();
const CONNECTION_TIMEOUT = 10000;

export const ELEMENT_ID = 'element-6066-11e4-a52e-4f735466cecf';
export const NOT_EXISTING_ELEMENT = '00000000-0000-0000-0000-000000000000';
export const HOME_PAGE = `http://localhost:4723/appium-html-driver/home/${UDID}`;

export function startBrowser(options?: LaunchOptions): { driver: Browser<'async'> } {
  before(async () => {
    playwright = await chromium.launch(options);
  });

  beforeEach(async () => {
    appium = await remote({
      port: 4723,
      hostname: '0.0.0.0',
      protocol: 'http',
      logLevel: 'silent',
      connectionRetryCount: 0,
      capabilities: <any>{
        platformName: 'html',
        'appium:automationName': 'html',
        'appium:udid': UDID,
        'appium:handle': 'main',
      },
    });

    context = await playwright.newContext({ viewport: null });
    const page = await context.newPage();
    await page.evaluate(`window.open('${HOME_PAGE}/main', '', 'resizable,noopener')`);
    await page.close();

    await waitWindow('main', false);
  });

  afterEach(async () => {
    await appium.deleteSession();
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
    ) as Browser<'async'>,
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

async function waitWindow(handle: string, allowExtraHandles: boolean = true, timeout: number = CONNECTION_TIMEOUT): Promise<void> {
  async function connected(): Promise<boolean> {
    const handles = await appium.getWindowHandles();
    return (allowExtraHandles || handles.length === 1) && handles.includes(handle);
  }

  await appium.waitUntil(connected, {
    timeout,
    timeoutMsg: `no window with '${handle}' handle`,
  });
}
