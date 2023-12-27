import { HOME_PAGE, inline, Mode, MODE, startBrowser } from './_base.js';

describe('getUrl', () => {
  const { driver } = startBrowser();

  it('should get url', async () => {
    await driver.navigateTo(`${HOME_PAGE}/main#page`);

    await driver.getUrl()
      .should.eventually.be.equal(`${HOME_PAGE}/main#page`);
  });

  if (MODE == Mode.ODC) {
    it('should throw UnsupportedOperation for instrumented frame', async () => {
      await inline(`
        <iframe src="${HOME_PAGE}/frame"/>
      `);

      await driver.switchToWindow('frame');

      await driver.getUrl()
        .should.eventually.be.rejected.with.property('name', 'unsupported operation');
    });
  }
});
