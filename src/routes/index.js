import Router from 'koa-router';
import userController from '@/controllers/user';
import postController from '@/controllers/post';
import validateToken from '@/middleware/verify-token';
const router = new Router();

// User
router
  .post('/auth', userController.userAuth)
  .post('/register', userController.userRegister)

// Posts 
router
  .get('/posts', postController.get)
  .post('/posts', postController.create)


export default router