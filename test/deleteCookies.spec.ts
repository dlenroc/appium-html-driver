import { startBrowser } from './_base.js';

describe('deleteCookies', () => {
  const { driver } = startBrowser();

  it('should delete all cookies', async () => {
    await driver.addCookie({ name: 'fist-cookie', value: 'fist-cookie-value' });
    await driver.addCookie({ name: 'cookie-2', value: 'cookie-2-value' });

    await driver.deleteAllCookies();

    await driver.getAllCookies()
      .should.eventually
      .not.contain.something.with.property('name', 'cookie-1')
      .not.contain.something.with.property('name', 'cookie-2');
  });
});
