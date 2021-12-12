import { inline, NOT_EXISTING_ELEMENT, startBrowser } from './_base';

describe('clear', () => {
  const { driver } = startBrowser();

  it('should clear input', async () => {
    const [input] = await inline(`
      <input data-return value="text">
    `);

    await driver.elementClear(input);

    await driver.getElementProperty(input, 'value')
      .should.eventually.be.empty;
  });

  it('should clear textarea', async () => {
    const [input] = await inline(`
      <textarea data-return>text</textarea>
    `);

    await driver.elementClear(input);

    await driver.getElementProperty(input, 'value')
      .should.eventually.be.empty;
  });

  it('should clear content editable element', async () => {
    const [input] = await inline(`
      <div data-return contenteditable>text</div>
    `);

    await driver.elementClear(input);

    await driver.getElementText(input)
      .should.eventually.be.empty;
  });

  it('should throw InvalidElementState', async () => {
    const [input] = await inline(`
      <input data-return disabled>
    `);

    await driver.elementClear(input)
      .should.eventually.be.rejected.with.property('name', 'invalid element state');
  });

  it('should throw StaleElementReference', async () => {
    await driver.elementClear(NOT_EXISTING_ELEMENT)
      .should.eventually.be.rejected.with.property('name', 'stale element reference');
  });
});
