import { HOME_PAGE, inline, Mode, MODE, startBrowser } from './_base';

describe('maximizeWindow', () => {
  const { driver } = startBrowser();

  it('should maximize window', async () => {
    const rect = await driver.executeScript(`
      return {
        x: screen.availLeft,
        y: screen.availTop,
        width: screen.availWidth,
        height: screen.availHeight
      }
    `, []);

    await driver.maximizeWindow()
      .should.eventually.be.eql(rect);
  });

  if (MODE == Mode.ODC) {
    it('should throw UnsupportedOperation for instrumented frame', async () => {
      await inline(`
        <iframe src="${HOME_PAGE}/frame"/>
      `);

      await driver.switchToWindow('frame');

      await driver.maximizeWindow()
        .should.eventually.be.rejected.with.property('name', 'unsupported operation');
    });
  }
});
