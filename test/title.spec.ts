import { describe, it } from 'node:test';
import { HOME_PAGE, inline, startBrowser } from './_base.js';

describe('title', () => {
  const { driver } = startBrowser();

  it('should get title', async () => {
    await inline(`
      <title>Page title</title>
    `);

    await driver.getTitle()
      .should.eventually.be.equal('Page title');
  });

  it('should throw UnsupportedOperation for instrumented frame', async () => {
    await inline(`
      <iframe src="${HOME_PAGE}&handle=frame"/>
    `);

    await driver.switchToWindow('frame');

    await driver.getTitle()
      .should.eventually.be.rejected.with.property('name', 'unsupported operation');
  });
});
