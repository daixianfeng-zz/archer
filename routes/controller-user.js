var userModel = require('../models/user');

module.exports = async (ctx, next) => {
    ctx.tpl = 'user';
    var info = await Promise.all([userModel.getUserInfo(ctx),userModel.getAccountInfo(ctx)]);
    ctx.data = Object.assign(info[0].data, info[1].data, {userName: 'daixianfeng'});
    ctx.body = JSON.stringify(ctx.data);
    // await ctx.render(ctx.tpl, JSON.stringify(ctx.data));
}