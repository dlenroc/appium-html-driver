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
