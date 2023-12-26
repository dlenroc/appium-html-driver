import { HOME_PAGE, inline, Mode, MODE, startBrowser } from './_base';

describe('title', () => {
  const { driver } = startBrowser();

  it('should get title', async () => {
    await inline(`
      <title>Page title</title>
    `);

    await driver.getTitle()
      .should.eventually.be.equal('Page title');
  });

  if (MODE == Mode.ODC) {
    it('should throw UnsupportedOperation for instrumented frame', async () => {
      await inline(`
        <iframe src="${HOME_PAGE}/frame"/>
      `);

      await driver.switchToWindow('frame');

      await driver.getTitle()
        .should.eventually.be.rejected.with.property('name', 'unsupported operation');
    });
  }
});
