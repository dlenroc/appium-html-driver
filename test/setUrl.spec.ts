import { HOME_PAGE, inline, Mode, MODE, startBrowser } from './_base';

describe('setUrl', () => {
  const { driver } = startBrowser();

  it('should navigate to url', async () => {
    await driver.navigateTo(`${HOME_PAGE}/main#other_page`);

    await driver.getUrl()
      .should.eventually.be.equal(`${HOME_PAGE}/main#other_page`);
  });

  if (MODE == Mode.ODC) {
    it('should throw UnsupportedOperation for instrumented frame', async () => {
      await inline(`
      <iframe src="${HOME_PAGE}/frame"/>
    `);

      await driver.switchToWindow('frame');

      await driver.navigateTo(HOME_PAGE)
        .should.eventually.be.rejected.with.property('name', 'unsupported operation');
    });
  }
});
