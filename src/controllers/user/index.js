import User from '@/models/user';
import { authValidation, registerValidation } from '@/models/user/validation'
import { pick } from 'lodash';
import hashing from '@/utils/hash';
import bcrypt from 'bcrypt';
import { userSerialization } from './serialization';
import HttpStatus from '@/utils/http-status-adapter'

export default {
  async userAuth(ctx, next) {
    const error = authValidation(ctx.request.body);
    if (error) return ctx.body = error;

    const user = await User.findOne({ email: ctx.request.body.email });
    if (!user) return ctx.body = 'Invalid email or password';

    const validPassword = await bcrypt.compare(ctx.request.body.password, user.password);
    if (!validPassword) {
      ctx.status = HttpStatus.notAcceptable;
      return ctx.body = {
        success: false,
        error: `Invalid email or password`,
      }
    };

    const payload = { user: user._id }

    const token = User.generateToken(payload);
    ctx.status = HttpStatus.OK;
    ctx.body = {
      token,
      success: true
    }
  },

  async userRegister(ctx, next) {
    const error = registerValidation(ctx.request.body);
    if (error) return ctx.body = error;
    
    let user;
    user = await User.findOne({ email: ctx.request.body.email });
    
    if (user) return ctx.body = `This ${user.email} is registered`

    user = new User(pick(ctx.request.body, ['name', 'email', 'password']));
    user.password = await hashing(user.password);

    const payload = { user: user._id }

    const token = User.generateToken(payload);

    await user.save();
    
    ctx.body = {
      data: pick(user, userSerialization),
      token
    };
  }
};
