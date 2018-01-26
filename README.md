# egg-passsport-local

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

[npm-image]: https://img.shields.io/npm/v/egg-passsport-local.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-passsport-local
[travis-image]: https://img.shields.io/travis/eggjs/egg-passsport-local.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-passsport-local
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-passsport-local.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-passsport-local?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-passsport-local.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-passsport-local
[snyk-image]: https://snyk.io/test/npm/egg-passsport-local/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-passsport-local

<!--
Description here.
-->

## Install

```bash
$ npm i egg-passsport-local --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.passsportLocal = {
  enable: true,
  package: 'egg-passsport-local',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.passsportLocal = {
  usernameField: 'your custom user name field' // Optional, defaults to 'username'
  passwordField: 'your custom password field' // Optional, defaults to 'password'
};
```

The available options are:

- `usernameField` - Optional, defaults to 'username'
- `passwordField` - Optional, defaults to 'password'

Both fields define the name of the properties in the POST body that are sent to the server.

see [config/config.default.js](config/config.default.js) for more detail.

after login successful,we can redirect to origin url use `ctx.session.returnTo` before go to login page, for example:

```js
ctx.sessioin.returnTo = ctx.path;
```

## Example

```js
// ./controller/home.js

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
      ctx.body = `
        <div>
          <h2>${ctx.path}</h2>
          <a href="/admin">admin</a>
        </div>`;
  }

  async admin() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      // show user info
    } else {
      // redirect to origin url by ctx.session.returnTo
      ctx.session.returnTo = ctx.path;
      await ctx.render('login.html');
    }
  }

  async logout() {
    const ctx = this.ctx;

    ctx.logout();
    ctx.redirect(ctx.get('referer') || '/');
  }
}

module.exports = HomeController;

```

```js
// router.js
module.exports = app => {
  app.router.get('/', 'home.render');
  app.router.get('/admin', 'home.admin');

  const localStrategy = app.passport.authenticate('local');
  app.router.post('/passport/local', localStrategy);

  app.router.get('/logout', 'user.logout');
};
```

see [passport example](https://github.com/eggjs/examples/tree/master/passport) for more detail.

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
