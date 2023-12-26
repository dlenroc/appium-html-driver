import { HOME_PAGE, inline, Mode, MODE, startBrowser } from './_base';

describe('closeWindow', () => {
  const { driver } = startBrowser();

  it('should close window', async () => {
    const { handle } = await driver.createWindow('tab');

    await driver.closeWindow();

    await driver.getWindowHandles()
      .should.eventually.be.eql([handle]);
  });

  it('should throw NoSuchWindow', async () => {
    await driver.createWindow('tab');

    await driver.closeWindow();

    await driver.closeWindow()
      .should.eventually.be.rejected.with.property('name', 'no such window');
  });

  if (MODE == Mode.ODC) {
    it('should throw UnsupportedOperation for instrumented frame', async () => {
      await inline(`
        <iframe src="${HOME_PAGE}/frame"/>
      `);

      await driver.switchToWindow('frame');

      await driver.closeWindow()
        .should.eventually.be.rejected.with.property('name', 'unsupported operation');
    });
  }
});
