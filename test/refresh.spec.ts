import { setTimeout } from 'timers/promises';
import { HOME_PAGE, inline, startBrowser } from './_base';

describe('refresh', () => {
  const { driver } = startBrowser();

  it('should reload the page', async () => {
    const url = await driver.getUrl();
    await driver.executeScript('window.noReloaded = true', []);

    await driver.refresh();

    await setTimeout(1e3); // wait page to refresh

    await driver.executeScript('return window.noReloaded || location.href', [])
      .should.eventually.be.equal(url);
  });

  it('should throw UnsupportedOperation for instrumented frame', async () => {
    await inline(`
      <iframe src="${HOME_PAGE}/frame"/>
    `);

    await driver.switchToWindow('frame');

    await driver.navigateTo(`${HOME_PAGE}/main#other_page`)
      .should.eventually.be.rejected.with.property('name', 'unsupported operation');
  });
});
