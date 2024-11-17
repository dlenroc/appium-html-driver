import { describe, it } from 'node:test';
import { HOME_PAGE, startBrowser } from './_base.js';

describe('getUrl', () => {
  const { driver } = startBrowser();

  it('should get url', async () => {
    await driver.navigateTo(`${HOME_PAGE}&handle=main#page`);

    await driver.getUrl()
      .should.eventually.be.equal(`${HOME_PAGE}&handle=main#page`);
  });
});
