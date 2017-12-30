'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  router.get('/home', controller.home.home);

  router.post('/passport/local', app.passport.authenticate('local', {
    successRedirect: '/home',
  }));
};
