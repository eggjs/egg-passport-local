'use strict';
module.exports = app => {
  app.passport.verify(async (ctx, user) => {
    return user;
  });
};
