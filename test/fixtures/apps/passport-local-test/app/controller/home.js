'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;

    if (ctx.isAuthenticated()) {
      ctx.body = `<div>
        <h2>${ctx.path}</h2>
        <hr>
        Logined user: ${ctx.user.provider} / ${ctx.user.username} / ${ctx.user.password}| <a href="/logout">Logout</a>
        <hr>
        <a href="/admin">Admin</a>
      </div>`;
    } else {
      ctx.session.returnTo = ctx.path;
      ctx.body = `
        <div>
          <h2>${ctx.path}</h2>
          <hr>
          Login with
          <a href="/login">Local</a>
          <hr>
          <a href="/admin">Admin</a>
        </div>
      `;
    }
  }

  async login() {
    await this.ctx.render('login.html');
  }

  async admin() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      ctx.body = ctx.user;
    } else {
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
