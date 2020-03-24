import Router from 'koa-router';
import userController from '@/controllers/user';
import postController from '@/controllers/post';
import commentController from '@/controllers/comment';
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
  .del('/post/:id', postController.delete)
  .put('/post/:id', postController.put)

// Comments
router
  .get('/comments', commentController.get)
  .post('/comments', commentController.create)

export default router