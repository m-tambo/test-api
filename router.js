const Router = require('koa-router');
const { getAllUsers } = require('./user');

const router = Router();  

router.get('/', landingPage);
router.get('/users', getAllUsers);

function landingPage(ctx) {
    ctx.body = 'for user data, navigate to /users';
}

module.exports = router;
