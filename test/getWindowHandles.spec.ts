import { describe, it } from 'node:test';
import { startBrowser } from './_base.js';

describe('getWindowHandles', () => {
  const { driver } = startBrowser();

  it('should get window handles', async () => {
    const defaultWindowHandle = await driver.getWindowHandle();
    const { handle: firstWindowHandle } = await driver.createWindow('tab');
    const { handle: secondWindowHandle } = await driver.createWindow('tab');
    const { handle: lastWindowHandle } = await driver.createWindow('tab');

    await driver.switchToWindow(secondWindowHandle);
    await driver.closeWindow();

    await driver.getWindowHandles()
      .should.eventually.be.eql([defaultWindowHandle, firstWindowHandle, lastWindowHandle]);
  });
});
