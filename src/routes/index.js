const Router = require('koa-router');
const router = new Router();

const userController = require('../controllers/user');

router.get('/user', userController.getUsers)
router.post('/user', userController.createUser)

module.exports = router