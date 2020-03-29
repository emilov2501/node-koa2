import Router from 'koa-router';
import userController from '@/controllers/user';
import postController from '@/controllers/post';
import commentController from '@/controllers/comment';
import likeController from '@/controllers/likes';
import validateToken from '@/middleware/verify-token';
import sharingController from '@/controllers/shared-post'

const router = new Router();

// User
router
  .get('/users', validateToken, userController.getUsers)
  .get('/user/:id', validateToken, userController.getUserById)
  .post('/auth', userController.userAuth)
  .post('/register', userController.userRegister)

// Posts 
router
  .get('/posts', validateToken, postController.all)
  .get('/post/:id', validateToken, postController.get)
  .post('/posts', validateToken, postController.create)
  .del('/post/:id', validateToken, postController.delete)
  .put('/post/:id', validateToken, postController.put)
  
  // Sharing posts
  .post('/share/:id', validateToken, sharingController.sharingPost)
  .get('/share', sharingController.shareGet)

// Comments
router
  .get('/comments', validateToken, commentController.get)
  .post('/comments', validateToken, commentController.create)

// Likes
router
  .post('/like/:id', likeController.fetchLike)

export default router