var productModel = require('../../models/product');
var util = require('../../service/util.js');

module.exports = {
    getProductsByMonth: async (ctx, next) => {
        let month = ctx.request.body['month'] || ctx.query['month'];
        var conditions = {
            month: util.monthApiTrans(ctx, month)
        };
        var info = await productModel.getProductsByMonth(ctx, conditions);
        ctx.body = JSON.stringify(info);
    },
    getProductByName: async (ctx, next) => {
        let productName = ctx.request.body['productName'] || ctx.query['productName'];
        var conditions = {
            prdName: productName
        };
        var info = await productModel.getProductByName(ctx, conditions);
        ctx.body = JSON.stringify(info);
    },
    getProductsSummary: async (ctx, next) => {
        let month = ctx.request.body['month'] || ctx.query['month'];
        var conditions = {
            month: util.monthApiTrans(ctx, month)
        };
        var info = await productModel.getProductsSummary(ctx, conditions);
        ctx.body = JSON.stringify(info);
    }
}