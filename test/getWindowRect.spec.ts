import { HOME_PAGE, inline, Mode, MODE, startBrowser } from './_base.js';

describe('getWindowRect', () => {
  const { driver } = startBrowser();

  it('should get window rect', async () => {
    const rect = await driver.executeScript(`
      return {
        x: screenX,
        y: screenY,
        width: outerWidth,
        height: outerHeight
      }
    `, []);

    await driver.getWindowRect()
      .should.eventually.be.eql(rect);
  });

  if (MODE == Mode.ODC) {
    it('should throw UnsupportedOperation for instrumented frame', async () => {
      await inline(`
        <iframe src="${HOME_PAGE}/frame"/>
      `);

      await driver.switchToWindow('frame');

      await driver.getWindowRect()
        .should.eventually.be.rejected.with.property('name', 'unsupported operation');
    });
  }
});
