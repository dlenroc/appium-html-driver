import { startBrowser } from './_base';

describe('deleteCookie', () => {
  const { driver } = startBrowser();

  it('should delete cookie', async () => {
    await driver.addCookie({ name: 'fist-cookie', value: 'fist-cookie-value' });
    await driver.addCookie({ name: 'cookie-2', value: 'cookie-2-value' });

    await driver.deleteCookie('fist-cookie');

    await driver.getAllCookies()
      .should.eventually
      .not.contain.something.with.property('name', 'fist-cookie')
      .but.contain.something.with.property('name', 'cookie-2');
  });
});
