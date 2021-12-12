import { inline, NOT_EXISTING_ELEMENT, startBrowser } from './_base';

describe('getProperty', () => {
  const { driver } = startBrowser();

  it('should get property', async () => {
    const [input] = await inline(`
      <input data-return value="default value ">
    `);

    await driver.elementSendKeys(input, '+ new value');

    await driver.getElementProperty(input, 'value')
      .should.eventually.be.equal('default value + new value');
  });

  it('should get converted to string property', async () => {
    const [input] = await inline(`
      <input data-return checked type="checkbox">
    `);

    await driver.getElementProperty(input, 'checked')
      .should.eventually.be.equal('true');
  });

  it("should get null if property doesn't exist", async () => {
    const [input] = await inline(`
      <input data-return>
    `);

    await driver.getElementProperty(input, 'non-existent')
      .should.eventually.be.null;
  });

  it('should throw StaleElementReference', async () => {
    await driver.getElementProperty(NOT_EXISTING_ELEMENT, 'value')
      .should.eventually.be.rejected.with.property('name', 'stale element reference');
  });
});
