import { startBrowser } from './_base.js';

describe('getWindowHandle', () => {
  const { driver } = startBrowser();

  it('should get window handle', async () => {
    await driver.getWindowHandle()
      .should.eventually.not.be.empty;
  });
});
