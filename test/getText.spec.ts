import { inline, NOT_EXISTING_ELEMENT, startBrowser } from './_base.js';

describe('getText', () => {
  const { driver } = startBrowser();

  it('should get text', async () => {
    const [element] = await inline(`
      <div data-return>
        first line
        <input value="Ignored">
        <div style="display: none">Ignored</div>
        <div contenteditable>second line</div>
      </div>
    `);

    await driver.getElementText(element)
      .should.eventually.be.equal('first line \nsecond line');
  });

  it('should throw StaleElementReference', async () => {
    await driver.getElementText(NOT_EXISTING_ELEMENT)
      .should.eventually.be.rejected.with.property('name', 'stale element reference');
  });
});
