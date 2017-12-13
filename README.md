# egg-passport-local

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

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
[download-image]: https://img.shields.io/npm/dm/egg-passport-local.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-passport-local

[egg-passport](https://github.com/eggjs/egg-passport) local passport plugin, base on [passport-local](https://github.com/jaredhanson/passport-local)

## Install

```bash
$ npm i egg-passport-local --save
```

mount plugin:

```js
// {app_root}/config/plugin.js
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

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
