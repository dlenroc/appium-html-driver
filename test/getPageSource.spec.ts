import { inline, startBrowser } from './_base.js';

describe('getPageSource', () => {
  const { driver } = startBrowser();

  it('should get page source', async () => {
    const html = `<div>html</div>`;

    await inline(html);

    await driver.getPageSource()
      .should.eventually.contains(html);
  });
});
