import { inline, NOT_EXISTING_ELEMENT, startBrowser } from './_base';

describe('click', () => {
  const { driver } = startBrowser();

  it('should click', async () => {
    const [button] = await inline(`
      <input data-return type="button" value="Click Me" onclick="this.value = 'Finish'">
    `);

    await driver.elementClick(button);

    await driver.getElementProperty(button, 'value')
      .should.eventually.be.equal('Finish');
  });

  it('should throw ElementNotInteractable', async () => {
    const [element] = await inline(`
      <div data-return/>
    `);

    await driver.elementClick(element)
      .should.eventually.be.rejected.with.property('name', 'element not interactable');
  });

  it('should throw StaleElementReference', async () => {
    await driver.elementClick(NOT_EXISTING_ELEMENT)
      .should.eventually.be.rejected.with.property('name', 'stale element reference');
  });
});
