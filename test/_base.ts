/// <reference path='../types/chai.d.ts'/>

import { ElementReference } from '@wdio/protocols/build/types';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiLike from 'chai-like';
import chaiThings from 'chai-things';
import { randomUUID } from 'node:crypto';
import { after, afterEach, before, beforeEach } from 'node:test';
import { BrowserContext, LaunchOptions, Browser as PlaywrightBrowser, chromium } from 'playwright-chromium';
import { remote } from 'webdriverio';

let appium: WebdriverIO.Browser;
let context: BrowserContext;
let playwright: PlaywrightBrowser;

chai.use(chaiLike).should();
chai.use(chaiThings).should();
chai.use(chaiAsPromised).should();

export let HOME_PAGE: string;
export const ELEMENT_ID = 'element-6066-11e4-a52e-4f735466cecf';
export const NOT_EXISTING_ELEMENT = '00000000-0000-0000-0000-000000000000';

export function startBrowser(options?: LaunchOptions): {
  driver: WebdriverIO.Browser;
} {
  before(async () => {
    playwright = await chromium.launch(options);
  });

  beforeEach(async () => {
    const UDID = randomUUID();
    HOME_PAGE = `http://localhost:4723/appium-html-driver/home?udid=${UDID}`;

    appium = await remote({
      port: 4723,
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
    await Promise.all([context.waitForEvent('page'), page.evaluate(`window.open('${HOME_PAGE}&handle=main', '', 'resizable,noopener')`)]);
    await page.close();

    await waitWindow('main', false);
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

export async function inline(html: string): Promise<string[]> {
  const elements = await appium.executeScript(
    `
    document.documentElement.innerHTML = arguments[0];
    return [...document.querySelectorAll('[data-return]')];
    `,
    [html]
  );

  const matches = html.matchAll(/[?&]handle=(?<handle>.+?)['"&#]/g);
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
