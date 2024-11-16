import { describe, it } from 'node:test';
import { startBrowser } from './_base.js';

describe('setCookie', () => {
  const { driver } = startBrowser();

  it('should set cookie', async () => {
    const cookie = { name: 'cookie-1', value: 'cookie-1-value' };
    await driver.addCookie(cookie);

    await driver.getNamedCookie(cookie.name)
      .should.eventually.be.like(cookie);
  });

  it('should throw InvalidArgument', async () => {
    await driver.addCookie({})
      .should.eventually.be.rejected.with.property('name', 'invalid argument');
  });
});
