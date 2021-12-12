import { inline, NOT_EXISTING_ELEMENT, startBrowser } from './_base';

describe('getAttribute', () => {
  const { driver } = startBrowser();

  it('should get attribute', async () => {
    const [input] = await inline(`
      <input data-return value="default value">
    `);

    await driver.elementSendKeys(input, 'new value');

    await driver.getElementAttribute(input, 'value')
      .should.eventually.be.equal('default value');
  });

  it('should throw StaleElementReference', async () => {
    await driver.getElementAttribute(NOT_EXISTING_ELEMENT, 'value')
      .should.eventually.be.rejected.with.property('name', 'stale element reference');
  });
});
