'use strict';

module.exports = app => {
  app.router.get('/', 'home.render');
  app.router.get('/login', 'home.login');
  app.router.get('/admin', 'home.admin');

  const localStrategy = app.passport.authenticate('local');
  app.router.post('/passport/local', localStrategy);

  app.router.get('/logout', 'home.logout');
};
