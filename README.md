# egg-passsport-local

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

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
[download-image]: https://img.shields.io/npm/dm/egg-passsport-local.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-passsport-local

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

after login successful,we can redirect to origin url use `ctx.session.returnTo`

## Example

```javascript
// ./controller/home.js

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async render() {
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
      ctx.body = `<div>
        <a href="/logout">Logout</a>
        <pre><code>${JSON.stringify(ctx.user, null, 2)}</code></pre>
        <hr>
      </div>`;
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

```javascript
// router.js
module.exports = app => {
  app.router.get('/', 'home.render');
  app.router.get('/admin', 'home.admin');

  const localStrategy = app.passport.authenticate('local');
  app.router.post('/passport/local', localStrategy);

  app.router.get('/logout', 'user.logout');
};
```

```javascript
// config/plugin.js
exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportLocal = {
  enable: true,
  package: 'egg-passport-local',
};

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};
```

```javascript
// config/config.default.js
exports.view = {
  defaultViewEngine: 'nunjucks',
};
```

```html
// app/view/login.html
<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <title>egg-passport-local login page</title>
</head>

<body>
  <h1>egg-passport-local login page</h1>
  <form method="post" action="/passport/local">
    <div>
      <label>Username:</label>
      <input type="text" name="username" />
    </div>
    <div>
      <label>Password:</label>
      <input type="password" name="password" />
    </div>
    <div>
      <input type="submit" value="Log In" />
    </div>
  </form>
</body>

</html>
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
