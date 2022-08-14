# Appium HTML Driver · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/appium-html-driver?cacheSeconds=86400)](https://www.npmjs.com/package/@dlenroc/appium-html-driver) ![Node.js Version](https://img.shields.io/node/v/@dlenroc/appium-html-driver)

Appium HTML Driver is a WebDriver that allows controlling applications written using web technologies, regardless of the device they are running on.

## Installation

```sh
appium driver install --source npm @dlenroc/appium-html-driver
```

## Connection

### DevTools Protocol

If target supports the devtools protocol, then we can connect to it via [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface).

1. Get the DevTools target address (sample with `Google Chrome`)

   ```shell
   $ "<browser.path>" --user-data-dir="$(mktemp -d)" --remote-debugging-port="9222"

   DevTools listening on ws://127.0.0.1:9222/devtools/browser/c8f3b64d-aa40-4c56-b1d4-b4796fb24eae
   ```

2. Attach and run test

   ```typescript
   await driver = await remote({
     'capabilities': {
       'platformName': 'html',
       'appium:automationName': 'html',
       'appium:debuggingAddress': 'ws://127.0.0.1:9222/devtools/browser/c8f3b64d-aa40-4c56-b1d4-b4796fb24eae'
     },
   });

   // Attach to target
   const handles = await driver.getWindowHandles();
   await driver.switchToWindow(handles[0]);

   // Conduct testing
   await driver.getUrl()
     .should.eventually.be.fulfilled;
   ```

### On-Device Component

If target doesn't support [DevTools Protocol](#devtools-protocol) or you need access to pages it can't access, then `ODC` may be what you need.

1. Instrumentation

   Inject the following code in every HTML file that belongs to your application.

   ```html
   <script src="{origin}/appium-html-driver/js/{udid}/{handle}"></script>
   ```

   Where:

   - origin - address of the Appium server, for example: `http://192.168.0.2:4723`.
   - udid - identifier that represent your device, for > example: `{device-name}-{serial-number}`.
   - handle _(optional)_ - identifier that will represent the window handle.

2. Attach and run test

   ```typescript
   await driver = await remote({
     'capabilities': {
       'platformName': 'html',
       'appium:automationName': 'html',
       'appium:debuggingAddress': `odc://${udid}/${handle}`
     },
   });

   /**
    * Load instrumented page manually, via cli or in any other way
    *
    * NOTE: that is not driver's responsibility
    */

   // Attach to target
   const handles = await driver.getWindowHandles();
   await driver.switchToWindow(handles[0]);

   // Conduct testing
   await driver.getUrl()
     .should.eventually.be.fulfilled;
   ```

NOTE: Because of how the instrumentation process works, the test session should start first, and then the application.

If this is a problem, you can initialize the driver yourself once and then not care about the mentioned limitation:

```shell
curl 'http://localhost:4723/session' \
  -H 'content-type: application/json;charset=utf-8' \
  -d '{ "capabilities": { "alwaysMatch": { "platformName": "html", "appium:automationName": "html", "appium:debuggingAddress": "odc://init" } } }'
```

## Capabilities

| Capability                | Required |  Type  | Description                   |
| ------------------------- | :------: | :----: | ----------------------------- |
| `platformName`            |    +     | string | Must be `html`                |
| `appium:automationName`   |    +     | string | Must be `html`                |
| `appium:debuggingAddress` |    +     | string | See [Connection](#connection) |

## Commands

| Command                                                       | Description                |
| ------------------------------------------------------------- | -------------------------- |
| [active](src/client/commands/active.ts)                       | Get active element         |
| [back](src/client/commands/back.ts)                           | Back                       |
| [clear](src/client/commands/clear.ts)                         | Element clear              |
| [click](src/client/commands/click.ts)                         | Element click              |
| [closeWindow](src/server/commands/closeWindow.ts)             | Close window               |
| [createSession](src/server/commands/createSession.ts)         | New session                |
| [createNewWindow](src/server/commands/createNewWindow.ts)     | New window                 |
| [deleteCookie](src/client/commands/deleteCookie.ts)           | Delete cookie              |
| [deleteCookies](src/client/commands/deleteCookies.ts)         | Delete all cookies         |
| [elementDisplayed](src/client/commands/elementDisplayed.ts)   | Is element displayed       |
| [elementEnabled](src/client/commands/elementEnabled.ts)       | Is element enabled         |
| [elementSelected](src/client/commands/elementSelected.ts)     | Is element selected        |
| [execute](src/client/commands/execute.ts)                     | Execute script             |
| [executeAsync](src/client/commands/executeAsync.ts)           | Execute async script       |
| [findElement](src/client/commands/findElOrEls.ts)             | Find element               |
| [findElementFromElement](src/client/commands/findElOrEls.ts)  | Find element form element  |
| [findElements](src/client/commands/findElOrEls.ts)            | Find elements              |
| [findElementsFromElement](src/client/commands/findElOrEls.ts) | Find elements from element |
| [forward](src/client/commands/forward.ts)                     | Forward                    |
| [getAttribute](src/client/commands/getAttribute.ts)           | Get element attribute      |
| [getCookie](src/client/commands/getCookie.ts)                 | Get named cookie           |
| [getCookies](src/client/commands/getCookies.ts)               | Get all cookies            |
| [getCssProperty](src/client/commands/getCssProperty.ts)       | Get element CSS value      |
| [getElementRect](src/client/commands/getElementRect.ts)       | Get element rect           |
| [getName](src/client/commands/getName.ts)                     | Get element tag name       |
| [getPageSource](src/client/commands/getPageSource.ts)         | Get page source            |
| [getProperty](src/client/commands/getProperty.ts)             | Get element property       |
| [getText](src/client/commands/getText.ts)                     | Get element text           |
| [getTimeouts](src/server/commands/getTimeouts.ts)             | Get timeouts               |
| [getUrl](src/client/commands/getUrl.ts)                       | Get current URL            |
| [getWindowHandle](src/server/commands/getWindowHandle.ts)     | Get window handle          |
| [getWindowHandles](src/server/commands/getWindowHandles.ts)   | Get window handles         |
| [getWindowRect](src/client/commands/getWindowRect.ts)         | Get window rect            |
| [maximizeWindow](src/client/commands/maximizeWindow.ts)       | Maximize window            |
| [refresh](src/client/commands/refresh.ts)                     | Refresh                    |
| [setCookie](src/client/commands/setCookie.ts)                 | Add cookie                 |
| [setFrame](src/client/commands/setFrame.ts)                   | Switch to frame            |
| [setParentFrame](src/server/commands/setParentFrame.ts)       | Switch to parent frame     |
| [setUrl](src/client/commands/setUrl.ts)                       | Navigate to URL            |
| [setValue](src/client/commands/setValue.ts)                   | Element send keys          |
| [setWindow](src/server/commands/setWindow.ts)                 | Switch to window           |
| [setWindowRect](src/client/commands/setWindowRect.ts)         | Set window rect            |
| [timeouts](src/server/commands/timeouts.ts)                   | Set timeouts               |
| [title](src/client/commands/title.ts)                         | Get title                  |
