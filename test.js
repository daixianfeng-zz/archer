const Koa = require('koa');
const convert = require('koa-convert');
const co = require('co');
const app = new Koa();

var wait = () => {
    return new Promise(function(resolve, reject){
        setTimeout(()=>{
            resolve(3.2);
        }, 2000);
    });
}
/** koa2 ori */
app.use((ctx, next) => {
    console.log(1);
    return next();
});
app.use(async (ctx, next) => {
    console.log(2);
    await next();
    console.log(-2);
});
app.use(async (ctx, next) => {
    console.log(3);
    // var a = await wait();
    // console.log(a);
    await next();
    console.log(-3);
});
app.use((ctx, next) => {
    console.log(4);
    return next();
});
app.use(async (ctx, next) => {
    console.log(5);
    await next();
    console.log(-5);
});
app.use(async (ctx, next) => {
    console.log(6);
    await next();
    console.log(-6);
});
app.use(async (ctx, next) => {
    console.log(7);
    ctx.body = "hello test";
    await next();
    console.log(-7);
});

/** koa2 with convert */
// app.use(convert(function*(next){
//     console.log(1);
//     yield next;
// }));
// app.use(convert(function*(next){
//     console.log(2);
//     yield next;
//     console.log(-2);
// }));
// app.use(convert(function*(next){
//     console.log(3);
//     // var a = await wait();
//     // console.log(a);
//     yield next;
//     console.log(-3);
// }));
// app.use(convert(function*(next){
//     console.log(4);
//     yield next;
// }));
// app.use(convert(function*(next){
//     console.log(5);
//     yield next;
//     console.log(-5);
// }));
// app.use(convert(function*(next){
//     console.log(6);
//     yield next;
//     console.log(-6);
// }));
// app.use(convert(function*(next){
//     console.log(7);
//     // ctx.body = "hello test";
//     yield next;
//     console.log(-7);
// }));

/** koa2 with generator */
// app.use(co.wrap(function*(ctx, next){
//     console.log(1);
//     yield next();
// }));
// app.use(co.wrap(function*(ctx, next){
//     console.log(2);
//     yield next();
//     console.log(-2);
// }));
// app.use(co.wrap(function*(ctx, next){
//     console.log(3);
//     // var a = await wait();
//     // console.log(a);
//     yield next();
//     console.log(-3);
// }));
// app.use(co.wrap(function*(ctx, next){
//     console.log(4);
//     yield next();
// }));
// app.use(co.wrap(function*(ctx, next){
//     console.log(5);
//     yield next();
//     console.log(-5);
// }));
// app.use(co.wrap(function*(ctx, next){
//     console.log(6);
//     yield next();
//     console.log(-6);
// }));
// app.use(co.wrap(function*(ctx, next){
//     console.log(7);
//     ctx.body = "hello test";
//     yield next();
//     console.log(-7);
// }));
function onerror(err) {
    console.error(err);
}

app.listen(3001);