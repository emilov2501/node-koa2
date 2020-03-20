const { User, validation } = require('../models/user');
const { pick } = require('lodash');

module.exports = {
  async getUsers(ctx, next) {
    ctx.body = 'Hello'
  },

  async createUser(ctx, next) {
    const { error } = validation(ctx.request.body);
    if (error) {
      ctx.body = error.details[0].message
      return
    };
    
    let user;
    user = await User.findOne({ email: ctx.request.body.email });
    
    if (user) {
      ctx.body = `This ${user.email} is registered`
      return
    }

    user = new User(pick(ctx.request.body, ['name', 'email', 'password']));
    await user.save();

    ctx.body = user
  }
}