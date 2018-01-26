'use strict';

const LocalStrategy = require('passport-local').Strategy;

module.exports = app => {
  const config = app.config.passportLocal;
  config.passReqToCallback = true;

  app.passport.use(new LocalStrategy(config, (req, username, password, done) => {
    // 把 Passport 插件返回的数据进行清洗处理，返回 User 对象
    const user = {
      provider: 'local',
      username,
      password,
    };
    // 这里不处理应用层逻辑，传给 app.passport.verify 统一处理
    app.passport.doVerify(req, user, done);
  }));
};
