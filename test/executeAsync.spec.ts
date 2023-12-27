import { ELEMENT_ID, inline, NOT_EXISTING_ELEMENT, startBrowser } from './_base.js';

describe('executeAsync', () => {
  const { driver } = startBrowser();

  it('should execute javascript', async () => {
    const args = ['string', 3.14159, true, false, { key: 'value' }];
    const script = 'arguments[arguments.length - 1]([...arguments].slice(0, -1))';

    await driver.executeAsyncScript(script, args)
      .should.eventually.be.eql(args);
  });

  it('should return elements from javascript', async () => {
    const [id] = await inline(`
      <input data-return id="element">
    `);

    const element = { [ELEMENT_ID]: id, ELEMENT: id };
    const script = 'arguments[arguments.length - 1]({ element, elements: [element] })';

    await driver.executeAsyncScript(script, [])
      .should.eventually.be.eql({ element: element, elements: [element] });
  });

  it('should send elements to javascript', async () => {
    const [id] = await inline(`
      <input data-return id="element">
    `);

    const element = { [ELEMENT_ID]: id, ELEMENT: id };
    const args = { element: element, elements: [element, element] };
    const script = 'arguments[arguments.length - 1](arguments[0].element === element && arguments[0].elements[0] === element)';

    await driver.executeAsyncScript(script, [args])
      .should.eventually.be.true;
  });

  it('should throw StaleElementReference', async () => {
    const element = { [ELEMENT_ID]: NOT_EXISTING_ELEMENT };

    await driver.executeAsyncScript('', [element])
      .should.eventually.be.rejected.with.property('name', 'stale element reference');
  });
});
