import { startBrowser } from './_base.js';

describe('timeouts', () => {
  const { driver } = startBrowser();
  const defaultTimeouts = { implicit: 0, pageLoad: 300000, script: 30000, command: 60000 };

  it('should set all timeouts', async () => {
    const timeouts = { implicit: 10, pageLoad: 20, script: 30 };
    await driver.setTimeouts(timeouts.implicit, timeouts.pageLoad, timeouts.script);

    await driver.getTimeouts()
      .should.eventually.be.eql({ ...defaultTimeouts, ...timeouts });
  });

  it('should set implicit timeout', async () => {
    const implicit = 1000;
    await driver.setTimeouts(implicit);

    await driver.getTimeouts()
      .should.eventually.be.eql({ ...defaultTimeouts, implicit });
  });

  it('should set pageLoad timeout', async () => {
    const pageLoad = 1000;
    await driver.setTimeouts(undefined, pageLoad);

    await driver.getTimeouts()
      .should.eventually.be.eql({ ...defaultTimeouts, pageLoad });
  });

  it('should set script timeout', async () => {
    const script = 1000;
    await driver.setTimeouts(undefined, undefined, script);

    await driver.getTimeouts()
      .should.eventually.be.eql({ ...defaultTimeouts, script });
  });

  it('should throw InvalidArgument', async () => {
    await driver.setTimeouts(-1, -1, -1)
      .should.eventually.be.rejected.with.property('name', 'invalid argument');
  });
});
