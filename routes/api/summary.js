var indexModel = require('../models/index');

module.exports = async (ctx, next) => {
    ctx.tpl = 'index';
    ctx.data = {
        title: '产品日历'
    };
    await ctx.render(ctx.tpl, ctx.data);
}