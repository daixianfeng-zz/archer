const log4js = require('log4js');
const util = require('util');
const moment = require('moment');

const LOGGER_FORMAT = "%s %s -- %s %s HTTP/%s, %s %s";

const log4Middle = (args) => {
    log4js.configure(args);
    var logger = log4js.getLogger('visit');
    return async (ctx, next) => {
        ctx.log = logger;
        var startTime = new Date();
        let req = ctx.request;
        let serverReq = ctx.req;
        let header = req.header;
        let inStr = util.format(LOGGER_FORMAT, moment(startTime).format('YYYY-MM-DD HH:mm:ss(SSS)'), req.ip, req.method, req.url, serverReq.httpVersion, req.length||null, header['user-agent']);
        logger.debug('Start: '+inStr);    
        await next();
        var endTime = new Date();
        let outStr = util.format(LOGGER_FORMAT, moment(endTime).format('YYYY-MM-DD HH:mm:ss(SSS)'), req.ip, req.method, req.url, serverReq.httpVersion, req.length||null, header['user-agent']);
        logger.debug('End: '+outStr);
        logger.info('Response time(ms): '+(endTime-startTime));
    };
}
module.exports = log4Middle;