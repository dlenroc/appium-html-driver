import { startBrowser } from './_base.js';

describe('getCookie', () => {
  const { driver } = startBrowser();

  it('should get cookie by name', async () => {
    const cookie = { name: 'cookie-1', value: 'cookie-1-value' };

    await driver.addCookie(cookie);

    await driver.getNamedCookie(cookie.name)
      .should.eventually.be.like(cookie);
  });

  it('should throw NoSuchCookie', async () => {
    await driver.getNamedCookie('cookie')
      .should.eventually.be.rejected.with.property('name', 'no such cookie');
  });
});
