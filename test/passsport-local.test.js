'use strict';

const mock = require('egg-mock');

describe('test/passsport-local.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/passsport-local-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, passsportLocal')
      .expect(200);
  });

  it('should show login tip', () => {
    return app.httpRequest()
      .get('/home')
      .expect(/login page/)
      .expect(200);
  });

  it('should show user info', async () => {
    app.mockCsrf();
    await app.httpRequest().
      post('/passport/local')
      .type('form')
      .send(({
        username: 'username-local',
        password: 'password-local',
      }))
      .expect(302);
  });
});
