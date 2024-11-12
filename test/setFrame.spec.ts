import { describe, it } from 'node:test';
import { ELEMENT_ID, inline, NOT_EXISTING_ELEMENT, startBrowser } from './_base.js';

describe('setFrame', () => {
  const { driver } = startBrowser();

  it('should set frame by index', async () => {
    await inline(`
      <iframe srcdoc="<input>"/>
    `);

    await driver.switchToFrame(0);

    await driver.findElement('tag name', 'input')
      .should.eventually.be.fulfilled.with.property(ELEMENT_ID);
  });

  it('should set frame by element', async () => {
    const [frame] = await inline(`
      <iframe data-return srcdoc="<input>"/>
    `);

    await driver.switchToFrame({ [ELEMENT_ID]: frame });

    await driver.findElement('tag name', 'input')
      .should.eventually.be.fulfilled.with.property(ELEMENT_ID);
  });

  it('should set frame by null', async () => {
    await inline(`
      <iframe id="frame" srcdoc="<input>"/>
    `);

    await driver.switchToFrame(0);
    await driver.switchToFrame(null);

    await driver.findElement('tag name', 'iframe')
      .should.eventually.be.fulfilled.with.property(ELEMENT_ID);
  });

  it('should throw NoSuchFrame', async () => {
    const [div] = await inline(`
      <div data-return/>
    `);

    await driver.switchToFrame({ [ELEMENT_ID]: div })
      .should.eventually.be.rejected.with.property('name', 'no such frame');
  });

  it('should throw StaleElementReference', async () => {
    await driver.switchToFrame({ [ELEMENT_ID]: NOT_EXISTING_ELEMENT })
      .should.eventually.be.rejected.with.property('name', 'stale element reference');
  });
});
