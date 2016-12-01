var productModel = require('../models/product');

module.exports = async (ctx, next) => {
    ctx.tpl = 'list';
    var info = await productModel.getProductList(ctx);
    ctx.data = info;
    ctx.body = JSON.stringify(ctx.data);
    // await ctx.render(ctx.tpl, JSON.stringify(ctx.data));
}