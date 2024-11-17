import { describe, it } from 'node:test';
import { startBrowser } from './_base.js';

describe('refresh', () => {
  const { driver } = startBrowser();

  it('should reload the page', async () => {
    const url = await driver.getUrl();
    await driver.executeScript('window.noReloaded = true', []);

    await driver.refresh();

    // wait page to refresh
    await new Promise(resolve => setTimeout(resolve, 1e3));

    await driver.executeScript('return window.noReloaded || location.href', [])
      .should.eventually.be.equal(url);
  });
});
