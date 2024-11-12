import { describe, it } from 'node:test';
import { HOME_PAGE, inline, startBrowser } from './_base.js';

describe('getUrl', () => {
  const { driver } = startBrowser();

  it('should get url', async () => {
    await driver.navigateTo(`${HOME_PAGE}&handle=main#page`);

    await driver.getUrl()
      .should.eventually.be.equal(`${HOME_PAGE}&handle=main#page`);
  });

  it('should throw UnsupportedOperation for instrumented frame', async () => {
    await inline(`
      <iframe src="${HOME_PAGE}&handle=frame"/>
    `);

    await driver.switchToWindow('frame');

    await driver.getUrl()
      .should.eventually.be.rejected.with.property('name', 'unsupported operation');
  });
});
