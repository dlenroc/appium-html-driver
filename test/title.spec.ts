import { describe, it } from 'node:test';
import { inline, startBrowser } from './_base.js';

describe('title', () => {
  const { driver } = startBrowser();

  it('should get title', async () => {
    await inline(`
      <title>Page title</title>
    `);

    await driver.getTitle()
      .should.eventually.be.equal('Page title');
  });
});
