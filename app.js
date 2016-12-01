const Koa = require('koa');
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser');
const router = require('koa-router')();
const views = require('koa-views');
const error = require('koa-error');
const app = new Koa();

var routes = require(__dirname + '/routes/routes');

// onerror(app);
app.use(convert(error({
  template: __dirname + '/log/koa-error/current.log'
})));
app.use(convert(bodyparser()));

app.use(views(__dirname + '/template/', {
  map: {hbs: 'handlebars'},
  extension: 'hbs'
}));
app.use(routes.routes(), routes.allowedMethods());

app.on('error', (err, ctx) => {
  console.log(err);
});
app.listen(3000);