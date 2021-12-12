import { HOME_PAGE, inline, startBrowser } from './_base';

describe('setWindowRect', () => {
  const { driver } = startBrowser({ headless: false });
  const rect = { x: 100, y: 200, width: 800, height: 600 };
  const newRect = { x: 200, y: 400, width: 1280, height: 720 };

  it('should set window rect', async () => {
    await driver.setWindowRect(rect.x, rect.y, rect.width, rect.height)
      .should.eventually.be.eql(rect);
  });

  it('should set window size', async () => {
    await driver.setWindowRect(rect.x, rect.y, rect.width, rect.height);

    await driver.setWindowRect(null, null, newRect.width, newRect.height)
      .should.eventually.be.eql({ ...rect, width: newRect.width, height: newRect.height });
  });

  it('should set window position', async () => {
    await driver.setWindowRect(rect.x, rect.y, rect.width, rect.height);

    await driver.setWindowRect(newRect.x, newRect.y, null, null)
      .should.eventually.be.eql({ ...rect, x: newRect.x, y: newRect.y });
  });

  it('should throw InvalidArgument', async () => {
    await driver.setWindowRect(-1, -1, -1, -1)
      .should.eventually.be.rejected.with.property('name', 'invalid argument');
  });

  it('should throw UnsupportedOperation for instrumented frame', async () => {
    await inline(`
      <iframe src="${HOME_PAGE}/frame"/>
    `);

    await driver.switchToWindow('frame');

    await driver.setWindowRect(rect.x, rect.y, rect.width, rect.height)
      .should.eventually.be.rejected.with.property('name', 'unsupported operation');
  });
});
