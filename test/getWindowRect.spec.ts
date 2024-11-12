import { describe, it } from 'node:test';
import { HOME_PAGE, inline, startBrowser } from './_base.js';

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

  it('should throw UnsupportedOperation for instrumented frame', async () => {
    await inline(`
      <iframe src="${HOME_PAGE}&handle=frame"/>
    `);

    await driver.switchToWindow('frame');

    await driver.getWindowRect()
      .should.eventually.be.rejected.with.property('name', 'unsupported operation');
  });
});
