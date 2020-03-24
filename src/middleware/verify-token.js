import jwt from 'jsonwebtoken';
import config from 'config';
import HttpStatus from '@/utils/http-status-adapter'

function getTokenFromHeaders(ctx) {
  if (!ctx.headers.authorization) return ctx.throw(403, 'No token.')
  const token = ctx.headers.authorization.split(' ')[1];
  return token
}


async function validateToken (ctx, next) {
  const token = getTokenFromHeaders(ctx);
  try {
    const decoded = await jwt.verify(token, config.get('jwtPrivateKey'))
    if (!decoded) {
      return ctx.body = {
        success: false,
        message: 'Failed to authenticate token.',
      }
    }

    ctx.decoded = decoded
    await next()
  } catch (ex) {
    ctx.status = HttpStatus.serverError;
    ctx.body = 'Token invalid';
  }
};

export default validateToken;
