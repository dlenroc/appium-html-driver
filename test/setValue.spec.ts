import { inline, NOT_EXISTING_ELEMENT, startBrowser } from './_base.js';

describe('setValue', () => {
  const { driver } = startBrowser();

  it('should set text to the input', async () => {
    const [input] = await inline(`
      <input data-return type="number" value="111">
    `);

    await driver.elementSendKeys(input, '222');
    await driver.elementSendKeys(input, '333');

    await driver.getElementProperty(input, 'value')
      .should.eventually.be.equal('333');
  });

  it('should add text to the input', async () => {
    const [input] = await inline(`
      <input data-return value="default value">
    `);

    await driver.elementSendKeys(input, ' ');
    await driver.elementSendKeys(input, '+ new value');

    await driver.getElementProperty(input, 'value')
      .should.eventually.be.equal('default value + new value');
  });

  it('should add text to the textarea', async () => {
    const [textarea] = await inline(`
      <textarea data-return>default value</textarea>
    `);

    await driver.elementSendKeys(textarea, ' ');
    await driver.elementSendKeys(textarea, '+ new value');

    await driver.getElementProperty(textarea, 'value')
      .should.eventually.be.equal('default value + new value');
  });

  it('should add text to the contenteditable element', async () => {
    const [div] = await inline(`
      <div data-return contenteditable>default value</div>
    `);

    await driver.elementSendKeys(div, ' ');
    await driver.elementSendKeys(div, '+ new value');

    await driver.getElementText(div)
      .should.eventually.be.equal('default value + new value');
  });

  it('should throw ElementNotInteractable', async () => {
    const [input] = await inline(`
      <input data-return disabled>
    `);

    await driver.elementSendKeys(input, '')
      .should.eventually.be.rejected.with.property('name', 'element not interactable');
  });

  it('should throw StaleElementReference', async () => {
    await driver.elementSendKeys(NOT_EXISTING_ELEMENT, '')
      .should.eventually.be.rejected.with.property('name', 'stale element reference');
  });
});
