import type { Server } from 'http';
import type AppiumDriver from '@appium/base-driver';

declare module '@appium/base-driver' {
  export declare class BaseDriver extends AppiumDriver {
    protected server: Server;

    // Missing W3C Commands
    public createWindow?(type: string): Promise<WindowHandle>;
    public setParentFrame?(): Promise<void>;
  }

  export function errorFromW3CJsonCode(code: string, message: string, stacktrace = null): Error;

  export const errors: Record<'NotYetImplementedError' | 'NotImplementedError' | 'BadParametersError' | 'InvalidArgumentError' | 'NoSuchDriverError' | 'NoSuchElementError' | 'UnknownCommandError' | 'StaleElementReferenceError' | 'ElementNotVisibleError' | 'InvalidElementStateError' | 'UnknownError' | 'ElementIsNotSelectableError' | 'ElementClickInterceptedError' | 'ElementNotInteractableError' | 'InsecureCertificateError' | 'JavaScriptError' | 'XPathLookupError' | 'TimeoutError' | 'NoSuchWindowError' | 'NoSuchCookieError' | 'InvalidCookieDomainError' | 'InvalidCoordinatesError' | 'UnableToSetCookieError' | 'UnexpectedAlertOpenError' | 'NoAlertOpenError' | 'ScriptTimeoutError' | 'InvalidElementCoordinatesError' | 'IMENotAvailableError' | 'IMEEngineActivationFailedError' | 'InvalidSelectorError' | 'SessionNotCreatedError' | 'MoveTargetOutOfBoundsError' | 'NoSuchAlertError' | 'NoSuchContextError' | 'InvalidContextError' | 'NoSuchFrameError' | 'UnableToCaptureScreen' | 'UnknownMethodError' | 'UnsupportedOperationError' | 'ProxyRequestError', { new (...args: any[]): Error }>;

  export type WindowHandle = {
    type: string;
    handle: string;
  };
}
