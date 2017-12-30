'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, ' + this.app.plugins.passsportLocal.name;
  }

  async home() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      ctx.body = ctx.user;
    } else {
      ctx.body = `
      <h1>login page</h1>
      <form method="post" action="/passport/local">
        <div>
            <label>Username:</label>
            <input type="text" name="username"/>
        </div>
        <div>
            <label>Password:</label>
            <input type="password" name="password"/>
        </div>
        <div>
            <input type="submit" value="Log In"/>
        </div>
      </form>
      `;
    }
  }
}

module.exports = HomeController;
