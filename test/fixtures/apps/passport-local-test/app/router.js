'use strict';

module.exports = app => {
  const { router } = app;
  router.get('/', 'home.index');
  router.get('/login', 'home.login');
  router.get('/admin', 'home.admin');

  const localStrategy = app.passport.authenticate('local');
  router.post('/passport/local', localStrategy);

  router.get('/logout', 'home.logout');
};
