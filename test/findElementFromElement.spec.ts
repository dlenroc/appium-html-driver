import { describe, it } from 'node:test';
import { ELEMENT_ID, inline, NOT_EXISTING_ELEMENT, startBrowser } from './_base.js';

describe('findElementFromElement', () => {
  const { driver } = startBrowser();

  it('should find element from element by id', async () => {
    const [parent, element] = await inline(`
      <input id="element-id">
      <div data-return>
        <input data-return id="element-id">
      </div>
    `);

    await driver.findElementFromElement(parent, 'id', 'element-id')
      .should.eventually.have.property(ELEMENT_ID, element);
  });

  it('should find element from element by tag name', async () => {
    const [parent, element] = await inline(`
      <input>
      <div data-return>
        <input data-return>
      </div>
    `);

    await driver.findElementFromElement(parent, 'tag name', 'input')
      .should.eventually.have.property(ELEMENT_ID, element);
  });

  it('should find element from element by link text', async () => {
    const [parent, element] = await inline(`
      <a> Link Text </a>
      <div data-return>
        <a data-return> Link Text </a>
      </div>
    `);

    await driver.findElementFromElement(parent, 'link text', 'Link Text')
      .should.eventually.have.property(ELEMENT_ID, element);
  });

  it('should find element from element by partial link text', async () => {
    const [parent, element] = await inline(`
      <a> Link Text </a>
      <div data-return>
        <a data-return> Link Text </a>
      </div>
    `);

    await driver.findElementFromElement(parent, 'partial link text', 'Text')
      .should.eventually.have.property(ELEMENT_ID, element);
  });

  it('should find element from element by css selector', async () => {
    const [parent, element] = await inline(`
      <input data-target>
      <div data-return>
        <input data-return data-target>
      </div>
    `);

    await driver.findElementFromElement(parent, 'css selector', '[data-target]')
      .should.eventually.have.property(ELEMENT_ID, element);
  });

  it('should find element from element by xpath', async () => {
    const [parent, element] = await inline(`
      <input data-target>
      <div data-return>
        <input data-return data-target>
      </div>
    `);

    await driver.findElementFromElement(parent, 'xpath', './*[@data-target]')
      .should.eventually.have.property(ELEMENT_ID, element);
  });

  it('should throw StaleElementReference', async () => {
    await driver.findElementFromElement(NOT_EXISTING_ELEMENT, 'css selector', '*')
      .should.eventually.be.rejected.with.property('name', 'stale element reference');
  });
});
