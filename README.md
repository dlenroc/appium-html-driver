# Appium HTML Driver · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/appium-html-driver?cacheSeconds=86400)](https://www.npmjs.com/package/@dlenroc/appium-html-driver) ![Node.js Version](https://img.shields.io/node/v/@dlenroc/appium-html-driver) ![Chrome 32](https://img.shields.io/badge/-32-%234285F4?logo=googlechrome&logoColor=white) ![Firefox 29](https://img.shields.io/badge/-29-%23FF7139?logo=firefox%20browser&logoColor=white) ![Safari 8](https://img.shields.io/badge/-8-%23007AFF?logo=safari&logoColor=white)

Appium HTML Driver is a WebDriver that allows controlling applications written using web technologies, regardless of the device they are running on.

## Installation

```sh
appium driver install --source npm @dlenroc/appium-html-driver
```

## Usage

1. Instrumentation

   Inject the following code in every HTML file that belongs to your application.

   ```html
   <script src="{origin}/appium-html-driver/js?udid={udid}&handle={handle}"></script>
   ```

   Where:

   - origin - address of the Appium server, for example: `http://192.168.0.2:4723`.
   - udid _(optional)_ - identifier that represents your device; defaults to the client's IP address.
   - handle _(optional)_ - identifier that will represent the window handle.

2. Attach and run test

   ```typescript
   await driver = await remote({
     'capabilities': {
       'platformName': 'html',
       'appium:automationName': 'html',
       'appium:udid': udid
     },
   });

   /**
    * Load instrumented page manually, via cli or in any other way
    *
    * NOTE: that is not the driver's responsibility
    */

   // Attach to target
   const handles = await driver.getWindowHandles();
   await driver.switchToWindow(handles[0]);

   // Conduct testing
   await driver.getUrl()
     .should.eventually.be.fulfilled;
   ```

## Capabilities

| Capability              | Required |  Type  | Description                                            |
| ----------------------- | :------: | :----: | ------------------------------------------------------ |
| `platformName`          |    +     | string | Must be `html`                                         |
| `appium:automationName` |    +     | string | Must be `html`                                         |
| `appium:udid`           |    +     | string | See [Connection](#connection)                          |
| `appium:handle`         |    -     | string | The window handle to switch to during session creation |

## Commands

| Command                                                           | Description                |
| ----------------------------------------------------------------- | -------------------------- |
| [active](src/client/commands/active.ts)                           | Get active element         |
| [back](src/client/commands/back.ts)                               | Back                       |
| [clear](src/client/commands/clear.ts)                             | Element clear              |
| [click](src/client/commands/click.ts)                             | Element click              |
| [closeWindow](src/server/commands/closeWindow.ts)                 | Close window               |
| [createNewWindow](src/server/commands/createNewWindow.ts)         | New window                 |
| [deleteCookie](src/client/commands/deleteCookie.ts)               | Delete cookie              |
| [deleteCookies](src/client/commands/deleteCookies.ts)             | Delete all cookies         |
| [elementDisplayed](src/client/commands/elementDisplayed.ts)       | Is element displayed       |
| [elementEnabled](src/client/commands/elementEnabled.ts)           | Is element enabled         |
| [elementSelected](src/client/commands/elementSelected.ts)         | Is element selected        |
| [execute](src/client/commands/execute.ts)                         | Execute script             |
| [executeAsync](src/client/commands/executeAsync.ts)               | Execute async script       |
| [findElement](src/client/commands/findElOrEls.ts)                 | Find element               |
| [findElementFromElement](src/client/commands/findElOrEls.ts)      | Find element from element  |
| [findElements](src/client/commands/findElOrEls.ts)                | Find elements              |
| [findElementsFromElement](src/client/commands/findElOrEls.ts)     | Find elements from element |
| [forward](src/client/commands/forward.ts)                         | Forward                    |
| [getAttribute](src/client/commands/getAttribute.ts)               | Get element attribute      |
| [getCookie](src/client/commands/getCookie.ts)                     | Get named cookie           |
| [getCookies](src/client/commands/getCookies.ts)                   | Get all cookies            |
| [getCssProperty](src/client/commands/getCssProperty.ts)           | Get element CSS value      |
| [getElementRect](src/client/commands/getElementRect.ts)           | Get element rect           |
| [getName](src/client/commands/getName.ts)                         | Get element tag name       |
| [getPageSource](src/client/commands/getPageSource.ts)             | Get page source            |
| [getProperty](src/client/commands/getProperty.ts)                 | Get element property       |
| [getText](src/client/commands/getText.ts)                         | Get element text           |
| [getTimeouts](src/server/commands/getTimeouts.ts)                 | Get timeouts               |
| [getUrl](src/client/commands/getUrl.ts)                           | Get current URL            |
| [getWindowHandle](src/server/commands/getWindowHandle.ts)         | Get window handle          |
| [getWindowHandles](src/server/commands/getWindowHandles.ts)       | Get window handles         |
| [getWindowRect](src/client/commands/getWindowRect.ts)             | Get window rect            |
| [maximizeWindow](src/client/commands/maximizeWindow.ts)           | Maximize window            |
| [refresh](src/client/commands/refresh.ts)                         | Refresh                    |
| [setCookie](src/client/commands/setCookie.ts)                     | Add cookie                 |
| [setFrame](src/client/commands/setFrame.ts)                       | Switch to frame            |
| [setUrl](src/client/commands/setUrl.ts)                           | Navigate to URL            |
| [setValue](src/client/commands/setValue.ts)                       | Element send keys          |
| [setWindow](src/server/commands/setWindow.ts)                     | Switch to window           |
| [setWindowRect](src/client/commands/setWindowRect.ts)             | Set window rect            |
| [switchToParentFrame](src/client/commands/switchToParentFrame.ts) | Switch to parent frame     |
| [timeouts](src/server/commands/timeouts.ts)                       | Set timeouts               |
| [title](src/client/commands/title.ts)                             | Get title                  |
