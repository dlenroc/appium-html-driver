import { describe, it } from 'node:test';
import { startBrowser } from './_base.js';

describe('getWindowRect', () => {
  const { driver } = startBrowser();

  it('should get window rect', async () => {
    const rect = await driver.executeScript(`
      return {
        x: screenX,
        y: screenY,
        width: outerWidth,
        height: outerHeight
      }
    `, []);

    await driver.getWindowRect()
      .should.eventually.be.eql(rect);
  });
});
