import { describe, it } from 'node:test';
import { HOME_PAGE, inline, startBrowser } from './_base.js';

describe('back', () => {
  const { driver } = startBrowser();

  it('should navigate back', async () => {
    await driver.navigateTo(`${HOME_PAGE}&handle=main#page1`);
    await driver.navigateTo(`${HOME_PAGE}&handle=main#page2`);

    await driver.back();

    await driver.getUrl()
      .should.eventually.be.equal(`${HOME_PAGE}&handle=main#page1`);
  });

  it('should throw UnsupportedOperation for instrumented frame', async () => {
    await inline(`
      <iframe src="${HOME_PAGE}&handle=frame"/>
    `);

    await driver.switchToWindow('frame');

    await driver.back()
      .should.eventually.be.rejected.with.property('name', 'unsupported operation');
  });
});
