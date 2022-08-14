import { HOME_PAGE, inline, Mode, MODE, startBrowser } from './_base';

describe('setWindow', () => {
  const { driver } = startBrowser();

  if (MODE == Mode.ODC) {
    it('should switch the current top-level context', async () => {
      await inline(`
      <iframe src="${HOME_PAGE}/frame"/>
    `);

      await driver.switchToWindow('frame');

      await driver.getWindowHandle()
        .should.eventually.be.equal('frame');
    });
  }

  it('should throw NoSuchWindowError', async () => {
    await driver.switchToWindow('non-existing')
      .should.eventually.be.rejected.with.property('name', 'no such window');
  });
});
