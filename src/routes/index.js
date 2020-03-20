import Router from 'koa-router';
import userController from '../controllers/user';

const router = new Router();


router
  .get('/user', userController.getUsers)
  .post('/user', userController.userAuth)

module.exports = router