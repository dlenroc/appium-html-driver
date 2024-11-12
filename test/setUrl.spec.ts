import { describe, it } from 'node:test';
import { HOME_PAGE, inline, startBrowser } from './_base.js';

describe('setUrl', () => {
  const { driver } = startBrowser();

  it('should navigate to url', async () => {
    await driver.navigateTo(`${HOME_PAGE}&handle=main#other_page`);

    await driver.getUrl()
      .should.eventually.be.equal(`${HOME_PAGE}&handle=main#other_page`);
  });

  it('should throw UnsupportedOperation for instrumented frame', async () => {
    await inline(`
      <iframe src="${HOME_PAGE}&handle=frame"/>
    `);

    await driver.switchToWindow('frame');

    await driver.navigateTo(HOME_PAGE)
      .should.eventually.be.rejected.with.property('name', 'unsupported operation');
  });
});
