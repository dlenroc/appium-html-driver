import { describe, it } from 'node:test';
import { HOME_PAGE, inline, startBrowser } from './_base.js';

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

  it('should throw UnsupportedOperation for instrumented frame', async () => {
    await inline(`
      <iframe src="${HOME_PAGE}&handle=frame"/>
    `);

    await driver.switchToWindow('frame');

    await driver.maximizeWindow()
      .should.eventually.be.rejected.with.property('name', 'unsupported operation');
  });
});
