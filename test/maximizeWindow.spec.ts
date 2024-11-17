import { describe, it } from 'node:test';
import { startBrowser } from './_base.js';

describe('maximizeWindow', () => {
  const { driver } = startBrowser();

  it('should maximize window', async () => {
    const rect = await driver.executeScript(`
      return {
        x: screen.availLeft,
        y: screen.availTop,
        width: screen.availWidth,
        height: screen.availHeight
      }
    `, []);

    await driver.maximizeWindow()
      .should.eventually.be.eql(rect);
  });
});
