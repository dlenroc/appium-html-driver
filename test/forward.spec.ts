import { describe, it } from 'node:test';
import { HOME_PAGE, startBrowser } from './_base.js';

describe('forward', () => {
  const { driver } = startBrowser();

  it('should navigate forward', async () => {
    await driver.navigateTo(`${HOME_PAGE}&handle=main#page1`);
    await driver.navigateTo(`${HOME_PAGE}&handle=main#page2`);

    await driver.back();
    await driver.forward();

    await driver.getUrl()
      .should.eventually.be.equal(`${HOME_PAGE}&handle=main#page2`);
  });
});
