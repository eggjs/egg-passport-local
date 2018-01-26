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
      .expect(/Login with/)
      .expect(200);
  });

  it('should show login tip', () => {
    return app.httpRequest()
      .get('/admin')
      .expect(/egg-passport-local login page/)
      .expect(200);
  });

  it('login', async () => {
    await app.httpRequest()
      .get('/')
      .expect(/Login with/)
      .expect(200);

    await app.httpRequest()
      .get('/login')
      .expect(/egg-passport-local login page/)
      .expect(200);

    app.mockCsrf();
    let cookie;
    await app.httpRequest().
      post('/passport/local')
      .type('form')
      .send(({
        username: 'username-local',
        password: 'password-local',
      }))
      .expect(302)
      .expect('Location', '/')
      .expect('set-cookie', /EGG_SESS/)
      .then(res => {
        cookie = res.header['set-cookie'];
      });

    await app.httpRequest()
      .get('/admin')
      .set('Cookie', cookie)
      .expect({
        provider: 'local',
        username: 'username-local',
        password: 'password-local',
      })
      .expect(200);
  });
});
