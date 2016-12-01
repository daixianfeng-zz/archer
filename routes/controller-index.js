module.exports = async (ctx, next) => {
    ctx.tpl = 'index';
    ctx.data = {title: 123};
    await ctx.render(ctx.tpl, ctx.data);
}