import { startBrowser } from './_base.js';

describe('getTimeouts', () => {
  const { driver } = startBrowser();
  const defaultTimeouts = { implicit: 0, pageLoad: 300000, script: 30000, command: 60000 };

  it('should get default timeouts', async () => {
    await driver.getTimeouts()
      .should.eventually.be.eql(defaultTimeouts);
  });
});
