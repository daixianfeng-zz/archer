module.exports = async (ctx, next) => {
    ctx.tpl = 'detail';
    ctx.data = {productId: ctx.params.id};
    await ctx.render(ctx.tpl, ctx.data);
}