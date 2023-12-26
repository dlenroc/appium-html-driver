import type { Constraints } from '@appium/types';

export const capabilitiesConstraints = {
  debuggingAddress: {
    isString: true,
    presence: true,
  },
} as const satisfies Constraints;
