import { ELEMENT_ID, inline, startBrowser } from './_base';

describe('findElement', () => {
  const { driver } = startBrowser();

  it('should find element by id', async () => {
    const [element] = await inline(`<input data-return id="element-id">`);

    await driver.findElement('id', 'element-id')
      .should.eventually.have.property(ELEMENT_ID, element);
  });

  it('should find element by tag name', async () => {
    const [element] = await inline(`<input data-return>`);

    await driver.findElement('tag name', 'input')
      .should.eventually.have.property(ELEMENT_ID, element);
  });

  it('should find element by link text', async () => {
    const [element] = await inline(`<a data-return> Link Text </a>`);

    await driver.findElement('link text', 'Link Text')
      .should.eventually.have.property(ELEMENT_ID, element);
  });

  it('should find element by partial link text', async () => {
    const [element] = await inline(`<a data-return> Link Text </a>`);

    await driver.findElement('partial link text', 'Text')
      .should.eventually.have.property(ELEMENT_ID, element);
  });

  it('should find element by css selector', async () => {
    const [element] = await inline(`<input data-return>`);

    await driver.findElement('css selector', '[data-return]')
      .should.eventually.have.property(ELEMENT_ID, element);
  });

  it('should find element by xpath', async () => {
    const [element] = await inline(`<input data-return>`);

    await driver.findElement('xpath', '//*[@data-return]')
      .should.eventually.have.property(ELEMENT_ID, element);
  });
});
