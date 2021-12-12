import { startBrowser } from './_base';

describe('getCookies', () => {
  const { driver } = startBrowser();

  it('should get all cookies', async () => {
    const cookies = [
      { name: 'cookie-1', value: 'cookie-1-value' },
      { name: 'cookie-2', value: 'cookie-2-value' },
    ];

    await driver.addCookie(cookies[0]);
    await driver.addCookie(cookies[1]);

    const allCookies = await driver.getAllCookies();

    allCookies.filter(({ name }) => name.startsWith('cookie-'))
      .should.be.like(cookies);
  });
});
