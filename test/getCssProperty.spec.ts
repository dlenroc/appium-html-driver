import { inline, NOT_EXISTING_ELEMENT, startBrowser } from './_base.js';

describe('getCssProperty', () => {
  const { driver } = startBrowser();

  it('should get css property', async () => {
    const color = 'red';
    const colorRGB = 'rgb(255, 0, 0)';
    const [element] = await inline(`
      <div data-return style="background-color: ${color}"/>
    `);

    await driver.getElementCSSValue(element, 'background-color')
      .should.eventually.be.equal(colorRGB);
  });

  it('should throw StaleElementReference', async () => {
    await driver.getElementCSSValue(NOT_EXISTING_ELEMENT, 'color')
      .should.eventually.be.rejected.with.property('name', 'stale element reference');
  });
});
