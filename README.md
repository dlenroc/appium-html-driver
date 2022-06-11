# Appium HTML Driver · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/appium-html-driver?cacheSeconds=86400)](https://www.npmjs.com/package/@dlenroc/appium-html-driver) ![Node.js Version](https://img.shields.io/node/v/@dlenroc/appium-html-driver)

An HTML driver that allows running WebDriver commands in the context of web applications running on any device with decent JS support.

Note:

- Interaction via `remote control` and `JS` is different, so I advise to use `remote control` where possible.
- Installation / Launch of the application is beyond the scope of the driver and must be performed separately.

## Installation

```sh
appium driver install --source npm @dlenroc/appium-html-driver
```

## Connection

If the device supports [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) then we can attach to page directly:

```shell
# an example of what the devtools debug address might look like
ws://127.0.0.1:9222/devtools/page/ABFB063F574323D4B5AE9A40BAFD22D7
```

Otherwise, the setup gets a bit more complicated, because in addition to `debuggingAddress` we also need to instrument the application under test:

1. Inject the following code in every HTML file that belongs to your application.

    ```html
    <script src="{origin}/appium-html-driver/js/{udid}/{handle}"></script>
    ```

    Where:

      - origin - address of the Appium server, for example: `http://192.168.0.2:4723`.
      - udid - identifier that represent your device, for example: `{device-name}-{serial-number}`.
      - handle _(optional)_ - identifier that will represent the window handle.

2. Point to the previously instrumented application in `debuggingAddress`.

    ```shell
    odc://{udid}/{handle}
    ```

    > NOTE: Because of how the instrumentation process works, the test session should start first, and then the application.
    >
    > If this is a problem, you can initialize the driver yourself once and then not care about the mentioned limitation:
    >
    > ```shell
    > curl 'http://localhost:4723/session' \
    >   -H 'content-type: application/json;charset=utf-8' \
    >   -d '{ "capabilities": { "alwaysMatch": { "platformName": "html", "appium:automationName": "html", "appium:debuggingAddress": "odc://init" } } }'
    > ```

## Capabilities

| Capability                | Required |  Type  | Description              |
| ------------------------- | :------: | :----: | ------------------------ |
| `platformName`            |    +     | string | Must be `html`           |
| `appium:automationName`   |    +     | string | Must be `html`           |
| `appium:debuggingAddress` |    +     | string | Device debugging address |

## Commands

| Command                                                       | Description                |
| ------------------------------------------------------------- | -------------------------- |
| [active](src/client/commands/active.ts)                       | Get active element         |
| [back](src/client/commands/back.ts)                           | Back                       |
| [clear](src/client/commands/clear.ts)                         | Element clear              |
| [click](src/client/commands/click.ts)                         | Element click              |
| [closeWindow](src/server/commands/closeWindow.ts)             | Close window               |
| [createSession](src/server/commands/createSession.ts)         | New session                |
| [createWindow](src/server/commands/createWindow.ts)           | New window                 |
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
| [setParentFrame](src/client/commands/setParentFrame.ts)       | Switch to parent frame     |
| [setUrl](src/client/commands/setUrl.ts)                       | Navigate to URL            |
| [setValue](src/client/commands/setValue.ts)                   | Element send keys          |
| [setWindow](src/server/commands/setWindow.ts)                 | Switch to window           |
| [setWindowRect](src/client/commands/setWindowRect.ts)         | Set window rect            |
| [timeouts](src/server/commands/timeouts.ts)                   | Set timeouts               |
| [title](src/client/commands/title.ts)                         | Get title                  |
