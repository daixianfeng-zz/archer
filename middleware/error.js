const log4js = require('log4js');
const util = require('util');
const moment = require('moment');

const LOGGER_FORMAT = "%s %s -- %s %s HTTP/%s, %s %s";

const errorMiddle = (args) => {
    log4js.configure(args);
    var errorLog = log4js.getLogger('error');
    return async (ctx, next) => {
        ctx.errorLog = errorLog;
        try{
            await next();
        }catch(e){
            let req = ctx.request;
            let serverReq = ctx.req;
            let header = req.header;
            let visitTime = new Date();
            let errorVisit = util.format(LOGGER_FORMAT, moment(visitTime).format('YYYY-MM-DD HH:mm:ss(SSS)'), req.ip, req.method, req.url, serverReq.httpVersion, req.length||null, header['user-agent']);
            errorLog.error(errorVisit+"\n"+e.stack);
        }
    };
}
module.exports = errorMiddle;