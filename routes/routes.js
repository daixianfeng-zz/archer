var router = require('koa-router')();
const indexController = require('./controller-index');
const productController = require('./api/product.js');

router
    .get('/', indexController)
    .get('/index', indexController)
    .get('/api/getSummaryByMonth.json', productController.getProductsSummary)
    .get('/api/getProductsByMonth.json', productController.getProductsByMonth)
    .get('/api/getProductByName.json', productController.getProductByName);

module.exports = router;