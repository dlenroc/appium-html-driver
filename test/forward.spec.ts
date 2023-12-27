import { HOME_PAGE, inline, Mode, MODE, startBrowser } from './_base.js';

describe('forward', () => {
  const { driver } = startBrowser();

  it('should navigate forward', async () => {
    await driver.navigateTo(`${HOME_PAGE}/main#page1`);
    await driver.navigateTo(`${HOME_PAGE}/main#page2`);

    await driver.back();
    await driver.forward();

    await driver.getUrl()
      .should.eventually.be.equal(`${HOME_PAGE}/main#page2`);
  });

  if (MODE == Mode.ODC) {
    it('should throw UnsupportedOperation for instrumented frame', async () => {
      await inline(`
        <iframe src="${HOME_PAGE}/frame"/>
      `);

      await driver.switchToWindow('frame');

      await driver.forward()
        .should.eventually.be.rejected.with.property('name', 'unsupported operation');
    });
  }
});
