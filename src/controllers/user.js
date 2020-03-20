import { User, validation } from '@/models/user'
import { pick } from 'lodash';
import hashing from '@/utils/hash';
import jwt from 'jsonwebtoken';

module.exports = {
  async getUsers(ctx, next) {
    ctx.body = 'Hello'
  },

  async userAuth(ctx, next) {
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
    user.password = await hashing(user.password);
    await user.save();
    ctx.body = pick(user, ['_id', 'name', 'email']);
  }
}