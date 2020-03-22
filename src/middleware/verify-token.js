import jwt from 'jsonwebtoken';
import config from 'config';
import HttpStatus from '@/utils/http-status-adapter'

function getTokenFromHeaders(ctx) {
  const token =
    ctx.response.body.token || req.response.query.token || req.headers['access-token']

  return token
}


async function validateToken (ctx, next) {
  const token = getTokenFromHeaders(req);

  if (token) {
    try {
      const decoded = await jwt.verify(token, config.get('jwtPrivateKey'))
      if (!verifyToken) {
        return ctx.body = {
          success: false,
          message: 'Failed to authenticate token.',
        }
      }

      ctx.decoded = decoded
      next()
    } catch (ex) {
      return ctx.body = {
        success: false,
        message: 'No token provided.',
      }
    }
  };
};

export default validateToken;
