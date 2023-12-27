import { inline, NOT_EXISTING_ELEMENT, startBrowser } from './_base.js';

describe('elementDisplayed', () => {
  const { driver } = startBrowser();

  it('should return true for visible element', async () => {
    const [element] = await inline(`
      <p data-return>visible text</p>
    `);

    await driver.isElementDisplayed(element)
      .should.eventually.be.fulfilled.with.true;
  });

  it('should return false for invisible element', async () => {
    const [element] = await inline(`
      <p data-return style="display: none">invisible text</p>
    `);

    await driver.isElementDisplayed(element)
      .should.eventually.be.fulfilled.with.false;
  });

  it('should throw StaleElementReference', async () => {
    await driver.isElementDisplayed(NOT_EXISTING_ELEMENT)
      .should.eventually.be.rejected.with.property('name', 'stale element reference');
  });
});
