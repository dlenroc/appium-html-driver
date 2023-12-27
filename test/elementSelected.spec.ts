import { inline, NOT_EXISTING_ELEMENT, startBrowser } from './_base.js';

describe('elementSelected', () => {
  const { driver } = startBrowser();

  it('should return true for checked checkbox', async () => {
    const [checkbox] = await inline(`
      <input data-return type="checkbox" checked>
    `);

    await driver.isElementSelected(checkbox)
      .should.eventually.be.fulfilled.with.true;
  });

  it('should return true for not checked checkbox', async () => {
    const [checkbox] = await inline(`
      <input data-return type="checkbox">
    `);

    await driver.isElementSelected(checkbox)
      .should.eventually.be.fulfilled.with.false;
  });

  it('should return true for selected option', async () => {
    const [option] = await inline(`
      <select>
        <option>first option</option>
        <option data-return selected>second option</option>
      </select>
    `);

    await driver.isElementSelected(option)
      .should.eventually.be.fulfilled.with.true;
  });

  it('should return true for not selected option', async () => {
    const [option] = await inline(`
      <select>
        <option>first option</option>
        <option data-return>second option</option>
      </select>
    `);

    await driver.isElementSelected(option)
      .should.eventually.be.fulfilled.with.false;
  });

  it('should throw StaleElementReference', async () => {
    await driver.isElementSelected(NOT_EXISTING_ELEMENT)
      .should.eventually.be.rejected.with.property('name', 'stale element reference');
  });
});
