import { describe, it } from 'node:test';
import { inline, NOT_EXISTING_ELEMENT, startBrowser } from './_base.js';

describe('getName', () => {
  const { driver } = startBrowser();

  it('should get tag name', async () => {
    const [input] = await inline(`
      <input data-return>
    `);

    await driver.getElementTagName(input)
      .should.eventually.be.equal('input');
  });

  it('should throw StaleElementReference', async () => {
    await driver.getElementTagName(NOT_EXISTING_ELEMENT)
      .should.eventually.be.rejected.with.property('name', 'stale element reference');
  });
});
