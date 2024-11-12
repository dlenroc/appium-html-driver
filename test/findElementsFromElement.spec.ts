import { describe, it } from 'node:test';
import { ELEMENT_ID, inline, NOT_EXISTING_ELEMENT, startBrowser } from './_base.js';

describe('findElementsFromElement', () => {
  const { driver } = startBrowser();

  it('should find elements from element by id', async () => {
    const [parent, ...elements] = await inline(`
      <input id="element-id">
      <div data-return>
        <input data-return id="element-id">
        <input data-return id="element-id">
      </div>
    `);

    await driver.findElementsFromElement(parent, 'id', 'element-id')
      .should.eventually.be.like(elements.map((element) => ({ [ELEMENT_ID]: element })));
  });

  it('should find elements from element by tag name', async () => {
    const [parent, ...elements] = await inline(`
      <input>
      <div data-return>
        <input data-return>
        <input data-return>
      </div>
    `);

    await driver.findElementsFromElement(parent, 'tag name', 'input')
      .should.eventually.be.like(elements.map((element) => ({ [ELEMENT_ID]: element })));
  });

  it('should find elements from element by link text', async () => {
    const [parent, ...elements] = await inline(`
      <a> Link Text </a>
      <div data-return>
        <a data-return> Link Text </a>
        <a data-return> Link Text </a>
      </div>
    `);

    await driver.findElementsFromElement(parent, 'link text', 'Link Text')
      .should.eventually.be.like(elements.map((element) => ({ [ELEMENT_ID]: element })));
  });

  it('should find elements from element by partial link text', async () => {
    const [parent, ...elements] = await inline(`
      <a> Link Text </a>
      <div data-return>
        <a data-return> Link Text </a>
        <a data-return> Link Text </a>
      </div>
    `);

    await driver.findElementsFromElement(parent, 'partial link text', 'Text')
      .should.eventually.be.like(elements.map((element) => ({ [ELEMENT_ID]: element })));
  });

  it('should find elements from element by css selector', async () => {
    const [parent, ...elements] = await inline(`
      <input data-target>
      <div data-return>
        <input data-return data-target>
        <input data-return data-target>
      </div>
    `);

    await driver.findElementsFromElement(parent, 'css selector', '[data-target]')
      .should.eventually.be.like(elements.map((element) => ({ [ELEMENT_ID]: element })));
  });

  it('should find elements from element by xpath', async () => {
    const [parent, ...elements] = await inline(`
      <input data-target>
      <div data-return>
        <input data-return data-target>
        <input data-return data-target>
      </div>
    `);

    await driver.findElementsFromElement(parent, 'xpath', './*[@data-target]')
      .should.eventually.be.like(elements.map((element) => ({ [ELEMENT_ID]: element })));
  });

  it('should throw StaleElementReference', async () => {
    await driver.findElementsFromElement(NOT_EXISTING_ELEMENT, 'css selector', '*')
      .should.eventually.be.rejected.with.property('name', 'stale element reference');
  });
});
