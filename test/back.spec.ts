import { describe, it } from 'node:test';
import { HOME_PAGE, startBrowser } from './_base.js';

describe('back', () => {
  const { driver } = startBrowser();

  it('should navigate back', async () => {
    await driver.navigateTo(`${HOME_PAGE}&handle=main#page1`);
    await driver.navigateTo(`${HOME_PAGE}&handle=main#page2`);

    await driver.back();

    await driver.getUrl()
      .should.eventually.be.equal(`${HOME_PAGE}&handle=main#page1`);
  });
});
