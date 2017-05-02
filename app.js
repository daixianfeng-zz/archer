const appConfig = require('./config/app-config');
const Koa = require('koa');
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser');
const error = require('./middleware/error');
const pageError = require('./middleware/page-error');
const logger = require('./middleware/log');
const static = require('koa-static');
const router = require('koa-router')();
const views = require('koa-views');

const app = new Koa();

var routes = require('./routes/routes');

app.use((ctx, next) => {
    ctx.appConfig = appConfig;
    return next();
});
app.use(error({
    appenders: [{
      "type": "console",
    },
    {
      "type": "file",
      "absolute": true,
      "filename": __dirname + "/log/koa-error/current.log",
      "maxLogSize": 2048000,
      "backups": 10,
      "category": "error"          
    }]
}));
app.use(static(__dirname + '/static'));
app.use(logger({
    appenders: [{
      "type": "console",
    },
    {
      "type": "file",
      "absolute": true,
      "filename": __dirname + "/log/koa-log/current.log",
      "maxLogSize": 2048000,
      "backups": 10,
      "category": "visit"          
    },
    {
      "type": "file",
      "absolute": true,
      "filename": __dirname + "/log/koa-error/current.log",
      "maxLogSize": 20480,
      "backups": 10,
      "category": "error"          
    }]
}));
app.use(pageError());
app.use(convert(bodyparser()));
app.use(views(__dirname + '/template/', {
    map: {hbs: 'pug'},
    extension: 'pug'
}));
app.use(routes.routes(), routes.allowedMethods());

app.on('error', (err, ctx) => {
    console.log('Outset error:'+"\n"+err.stack);
});
app.listen(appConfig.port);