var router = require('koa-router')();
const userController = require('./controller-user');
const indexController = require('./controller-index');
const listController = require('./controller-list');
const detailController = require('./controller-detail');

router
    .get('/', indexController)
    .get('/list', listController)
    .get('/user', userController)
    .get('/detail/:id', detailController);
    
module.exports = router;