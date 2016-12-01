const request = require('request');

const userModel = {
    getUserInfo: (ctx) => {
        return new Promise(function(resolve, reject){
            let userInfoOption = {
                url: '/portal/userInfo.json',
                headers: Object.assign(ctx.request.header,{from: 'nodejs'})
            };
            request(userInfoOption, function(err, response, body){
                if(err){
                    reject(err); 
                }
                try{
                    var userInfo = JSON.parse(body);
                    resolve(userInfo);
                }catch(e){
                    reject(e);
                }
            });
        });
    },
    getAccountInfo: (ctx) => {
        return new Promise(function(resolve, reject){
            let userInfoOption = {
                url: '/portal/accountInfo.json',
                headers: Object.assign(ctx.request.header,{from: 'nodejs'})
            };
            request(userInfoOption, function(err, response, body){
                if(err){
                    reject(err); 
                }
                try{
                    var accountInfo = JSON.parse(body);
                    resolve(accountInfo);
                }catch(e){
                    reject(e);
                }
            });
        });
    }
};


    
module.exports = userModel;