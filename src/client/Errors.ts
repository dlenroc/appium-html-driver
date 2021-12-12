export class WebDriverError extends Error {
  static forCode(code: string) {
    return function (message: string) {
      return new WebDriverError(message, code);
    };
  }

  constructor(message: string, code: string = 'unknown error') {
    super(message);
    this.name = code;
  }
}

export const ElementNotInteractable = WebDriverError.forCode('element not interactable');
export const InvalidArgument = WebDriverError.forCode('invalid argument');
export const InvalidElementState = WebDriverError.forCode('invalid element state');
export const JavaScriptError = WebDriverError.forCode('javascript error');
export const NoSuchCookie = WebDriverError.forCode('no such cookie');
export const NoSuchElement = WebDriverError.forCode('no such element');
export const NoSuchFrame = WebDriverError.forCode('no such frame');
export const StaleElementReference = WebDriverError.forCode('stale element reference');
export const UnknownCommand = WebDriverError.forCode('unknown command');
export const UnknownError = WebDriverError.forCode('unknown error');
export const UnsupportedOperation = WebDriverError.forCode('unsupported operation');
