const request = require('request');

module.exports = (ctx, options, resolve, reject) => {
    let basicAuth = new Buffer(ctx.appConfig.apiUser + ':' + ctx.appConfig.apiPwd).toString('base64')
    let transOptions = {
        headers: {
            "cookie": ctx.request.header['cookie'],
            "user-agent": ctx.request.header['user-agent'],
            "from": 'nodejs',
            "Authorization": 'Basic '+basicAuth
        },
        jar: true
    };
    var finalOptions = Object.assign(options, transOptions);
    request(finalOptions, function(err, response, body){
        if(err){
            ctx.errorLog.error('Network Error:')
            reject(err); 
        }else{
            var newCookies = response.headers['set-cookie'] || response.headers['Set-Cookie'] || [];
            ctx.res.setHeader.call(ctx.res, 'Set-Cookie', newCookies);
            resolve(body);
        }
    });
}
