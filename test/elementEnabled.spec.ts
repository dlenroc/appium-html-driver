import { describe, it } from 'node:test';
import { inline, NOT_EXISTING_ELEMENT, startBrowser } from './_base.js';

describe('elementEnabled', () => {
  const { driver } = startBrowser();

  it('should return true for enabled input', async () => {
    const [input] = await inline(`
      <input data-return>
    `);

    await driver.isElementEnabled(input)
      .should.eventually.be.fulfilled.with.true;
  });

  it('should return false for disabled input', async () => {
    const [input] = await inline(`
      <input data-return disabled>
    `);

    await driver.isElementEnabled(input)
      .should.eventually.be.fulfilled.with.false;
  });

  it('should throw StaleElementReference', async () => {
    await driver.isElementEnabled(NOT_EXISTING_ELEMENT)
      .should.eventually.be.rejected.with.property('name', 'stale element reference');
  });
});
