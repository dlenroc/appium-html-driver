import type { Constraints } from '@appium/types';

export const capabilitiesConstraints = {
  udid: {
    isString: true,
    presence: true,
  },
  handle: {
    isString: true,
    presence: false,
  },
} as const satisfies Constraints;
