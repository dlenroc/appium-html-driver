import { ELEMENT_ID, inline, startBrowser } from './_base.js';

describe('findElements', () => {
  const { driver } = startBrowser();

  it('should find elements by id', async () => {
    const elements = await inline(`
      <input data-return id="element-id">
      <input data-return id="element-id">
    `);

    await driver.findElements('id', 'element-id')
      .should.eventually.be.like(elements.map((element) => ({ [ELEMENT_ID]: element })));
  });

  it('should find elements by tag name', async () => {
    const elements = await inline(`
      <input data-return>
      <input data-return>
    `);

    await driver.findElements('tag name', 'input')
      .should.eventually.be.like(elements.map((element) => ({ [ELEMENT_ID]: element })));
  });

  it('should find elements by link text', async () => {
    const elements = await inline(`
      <a data-return> Link Text </a>
      <a data-return> Link Text </a>
    `);

    await driver.findElements('link text', 'Link Text')
      .should.eventually.be.like(elements.map((element) => ({ [ELEMENT_ID]: element })));
  });

  it('should find elements by partial link text', async () => {
    const elements = await inline(`
      <a data-return> Link Text </a>
      <a data-return> Link Text </a>
    `);

    await driver.findElements('partial link text', 'Text')
      .should.eventually.be.like(elements.map((element) => ({ [ELEMENT_ID]: element })));
  });

  it('should find elements by css selector', async () => {
    const elements = await inline(`
      <input data-return>
      <input data-return>
    `);

    await driver.findElements('css selector', '[data-return]')
      .should.eventually.be.like(elements.map((element) => ({ [ELEMENT_ID]: element })));
  });

  it('should find elements by xpath', async () => {
    const elements = await inline(`
      <input data-return>
      <input data-return>
    `);

    await driver.findElements('xpath', '//*[@data-return]')
      .should.eventually.be.like(elements.map((element) => ({ [ELEMENT_ID]: element })));
  });
});
