import { describe, it } from 'node:test';
import { ELEMENT_ID, startBrowser } from './_base.js';

describe('active', () => {
  const { driver } = startBrowser();

  it('should get active element', async () => {
    await driver.getActiveElement()
      .should.eventually.contain.keys(ELEMENT_ID);
  });

  it('should throw NoSuchElement', async () => {
    await driver.executeScript(`
      Object.defineProperty(document, 'activeElement', { get: () => null })
    `, []);

    await driver.getActiveElement()
      .should.eventually.have.property('error', 'no such element');
  });
});
