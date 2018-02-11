# egg-passport-local

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

[npm-image]: https://img.shields.io/npm/v/egg-passport-local.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-passport-local
[travis-image]: https://img.shields.io/travis/eggjs/egg-passport-local.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-passport-local
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-passport-local.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-passport-local?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-passport-local.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-passport-local
[snyk-image]: https://snyk.io/test/npm/egg-passport-local/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-passport-local

## Install

```bash
$ npm i egg-passport --save
$ npm i egg-passport-local --save
```

**Note:** also need [egg-passport](https://github.com/eggjs/egg-passport) .

## Usage

```js
// {app_root}/config/plugin.js
exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportLocal = {
  enable: true,
  package: 'egg-passport-local',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.passportLocal = {
  // usernameField: 'username',
  // passwordField: 'password',
};
```

The available options are:

- `usernameField` - Optional, defaults to `username`
- `passwordField` - Optional, defaults to `password`

Both fields define the name of the properties in the POST body that are sent to the server.

see [config/config.default.js](config/config.default.js) for more detail.

after login successful, we can redirect to origin url by using `ctx.session.returnTo` before go to login page, for example:

```js
ctx.sessioin.returnTo = ctx.path;
```

## Example

see [fixture](test/fixture/apps/passport-local-test) for more detail.

```js
// ./controller/home.js
class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    ctx.body = `
      <div>
        <h2>${ctx.path}</h2>
        <a href="/admin">admin</a>
      </div>
    `;
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
