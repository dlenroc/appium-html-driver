import { performance } from 'perf_hooks';
import { setTimeout } from 'timers';

export async function retrying<Type>(options: { duration?: number; timeout: number; command: () => Promise<Type>; validate: (result?: Type, error?: any) => boolean }): Promise<Type> {
  const duration = options.duration || 500;
  const endTimestamp = performance.now() + options.timeout;

  while (true) {
    let result;
    let exception;
    let hasException;

    try {
      result = await options.command();
    } catch (e) {
      exception = e;
      hasException = true;
    }

    const isValid = options.validate(result, exception);
    const elapsed = endTimestamp - performance.now();

    if (isValid || elapsed <= 0) {
      if (hasException) {
        throw exception;
      } else {
        return result as Type;
      }
    }

    if (elapsed > duration) {
      await new Promise(resolve => setTimeout(resolve, duration));
    } else {
      await new Promise(resolve => setTimeout(resolve, elapsed));
    }
  }
}
