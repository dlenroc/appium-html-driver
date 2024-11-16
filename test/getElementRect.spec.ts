import { describe, it } from 'node:test';
import { inline, NOT_EXISTING_ELEMENT, startBrowser } from './_base.js';

describe('getElementRect', () => {
  const { driver } = startBrowser();

  it('should get element rect', async () => {
    const rect = { x: 100, y: 200, width: 300, height: 400 };
    const [element] = await inline(`
      <div data-return style="
        background-color: red;
        position: fixed;
        left: ${rect.x}px;
        top: ${rect.y}px;
        width: ${rect.width}px;
        height: ${rect.height}px
      "/>
    `);

    await driver.getElementRect(element)
      .should.eventually.be.eql(rect);
  });

  it('should throw StaleElementReference', async () => {
    await driver.getElementRect(NOT_EXISTING_ELEMENT)
      .should.eventually.be.rejected.with.property('name', 'stale element reference');
  });
});
