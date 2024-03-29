import { HOME_PAGE, inline, Mode, MODE, startBrowser } from './_base.js';

describe('refresh', () => {
  const { driver } = startBrowser();

  it('should reload the page', async () => {
    const url = await driver.getUrl();
    await driver.executeScript('window.noReloaded = true', []);

    await driver.refresh();

    // wait page to refresh
    await new Promise(resolve => setTimeout(resolve, 1e3));

    await driver.executeScript('return window.noReloaded || location.href', [])
      .should.eventually.be.equal(url);
  });

  if (MODE == Mode.ODC) {
    it('should throw UnsupportedOperation for instrumented frame', async () => {
      await inline(`
        <iframe src="${HOME_PAGE}/frame"/>
      `);

      await driver.switchToWindow('frame');

      await driver.navigateTo(`${HOME_PAGE}/main#other_page`)
        .should.eventually.be.rejected.with.property('name', 'unsupported operation');
    });
  }
});
