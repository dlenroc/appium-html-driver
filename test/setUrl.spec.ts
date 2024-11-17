import { describe, it } from 'node:test';
import { HOME_PAGE, startBrowser } from './_base.js';

describe('setUrl', () => {
  const { driver } = startBrowser();

  it('should navigate to url', async () => {
    await driver.navigateTo(`${HOME_PAGE}&handle=main#other_page`);

    await driver.getUrl()
      .should.eventually.be.equal(`${HOME_PAGE}&handle=main#other_page`);
  });
});
