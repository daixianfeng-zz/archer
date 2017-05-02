
const pageErrorMiddle = (args) => {
    return async (ctx, next) => {
        try {
            await next();
        } catch(e) {
            let status = e.status || 521;
            let message = e.message || 'service error';
            ctx.body = {
                'error': status,
                'message': message
            };
            if (status == 521) { 
                ctx.app.emit('error', e, ctx);
            }
            return;
        }
    };
}
module.exports = pageErrorMiddle;