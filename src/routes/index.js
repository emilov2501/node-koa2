import Router from 'koa-router';
import userController from '@/controllers/user';

const router = new Router();

// User
router
  .post('/auth', userController.userAuth)
  .post('/register', userController.userRegister)

// Posts 
router
  .get('/post', (ctx, next) => ctx.body = 'Hello')

export default router