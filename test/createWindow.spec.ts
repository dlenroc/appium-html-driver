import { HOME_PAGE, inline, Mode, MODE, startBrowser } from './_base';

describe('createWindow', () => {
  const { driver } = startBrowser();

  it('should create a tab', async () => {
    const handle = await driver.getWindowHandle();
    const { handle: secondHandle } = await driver.createWindow('tab');

    await driver.getWindowHandle()
      .should.eventually.be.equal(handle);

    await driver.getWindowHandles()
      .should.eventually.be.eql([handle, secondHandle]);
  });

  it('should create a window', async () => {
    const handle = await driver.getWindowHandle();
    const { handle: secondHandle } = await driver.createWindow('window');

    await driver.getWindowHandle()
      .should.eventually.be.equal(handle);

    await driver.getWindowHandles()
      .should.eventually.be.eql([handle, secondHandle]);
  });

  it('should throw InvalidArgument', async () => {
    await driver.createWindow('invalid' as any)
      .should.eventually.be.rejected.with.property('name', 'invalid argument');
  });

  if (MODE == Mode.ODC) {
    it('should throw UnsupportedOperation for instrumented frame', async () => {
      await inline(`
        <iframe src="${HOME_PAGE}/frame"/>
      `);

      await driver.switchToWindow('frame');

      await driver.createWindow('window')
        .should.eventually.be.rejected.with.property('name', 'unsupported operation');
    });
  }
});
