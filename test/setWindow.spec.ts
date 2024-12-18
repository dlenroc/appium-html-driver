import { describe, it } from 'node:test';
import { HOME_PAGE, inline, startBrowser } from './_base.js';

describe('setWindow', () => {
  const { driver } = startBrowser();

  it('should switch the current top-level context', async () => {
    await inline(`
      <iframe src="${HOME_PAGE}&handle=frame"/>
    `);

    await driver.switchToWindow('frame');

    await driver.getWindowHandle()
      .should.eventually.be.equal('frame');
  });

  it('should throw NoSuchWindowError', async () => {
    await driver.switchToWindow('non-existing')
      .should.eventually.be.rejected.with.property('name', 'no such window');
  });
});
