export * from '@appium/types';

declare module '@appium/types' {
  export type WindowHandle = {
    type: string;
    handle: string;
  };
}
