import { ELEMENT_ID, inline, NOT_EXISTING_ELEMENT, startBrowser } from './_base';

describe('execute', () => {
  const { driver } = startBrowser();

  it('should execute javascript', async () => {
    const args = ['string', 3.14159, true, false, { key: 'value' }];
    const script = 'return [...arguments]';

    await driver.executeScript(script, args)
      .should.eventually.be.eql(args);
  });

  it('should return elements from javascript', async () => {
    const [id] = await inline(`
      <input data-return id="element">
    `);

    const element = { [ELEMENT_ID]: id, ELEMENT: id };
    const script = 'return { element, elements: [element] }';

    await driver.executeScript(script, [])
      .should.eventually.be.eql({ element: element, elements: [element] });
  });

  it('should send elements to javascript', async () => {
    const [id] = await inline(`
      <input data-return id="element">
    `);

    const element = { [ELEMENT_ID]: id, ELEMENT: id };
    const args = { element: element, elements: [element, element] };
    const script = 'return arguments[0].element === element && arguments[0].elements[0] === element';

    await driver.executeScript(script, [args])
      .should.eventually.be.true;
  });

  it('should throw StaleElementReference', async () => {
    const element = { [ELEMENT_ID]: NOT_EXISTING_ELEMENT };

    await driver.executeScript('', [element])
      .should.eventually.be.rejected.with.property('name', 'stale element reference');
  });
});
