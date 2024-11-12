import type { Driver } from '../Driver';

export function setWindow(this: Driver): void {
  window.focus();
}
