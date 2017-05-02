const mysql = require('mysql');
var connecting = (connection) => {
    return new Promise((resolve, reject) => {
        connection.connect(function(err){
            if(err){
                reject(connection);
            }else{
                resolve(connection);
            }
        });
    })
}; 
const mysqlMiddle = (args) => {
    return async (ctx, next) => {
        if(ctx.mysql){
            await next();
        }else{
            var connection = mysql.createConnection(args);
            connection = await connecting(connection);
            connection.on('error', (err) => {
                ctx.errorLog.error('Database Connect Error:'+"\n"+err.stack);
                throw('Database Connect Error', 500);
            });
            Object.assign(ctx, {
                mysql: connection
            });
            await next();
        }
    };
};
module.exports = mysqlMiddle;