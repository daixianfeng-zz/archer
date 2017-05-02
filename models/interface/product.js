const request = require('request');
var communication = require('../../service/communication');

const productInterface = {
    getSummaryByMonth: (ctx, conditions) => {
        return new Promise(function(resolve, reject){
            let productOption = {
                method: 'GET',
                qs: conditions,
                url: ctx.appConfig.apiHost+'/productCalendar/monthSummary'
            };
            communication(ctx, productOption, resolve, reject);
        });
    },
    getProductsStartByTime: (ctx, conditions) => {
        return new Promise(function(resolve, reject){
            let productOption = {
                method: 'GET',
                qs: conditions,
                url: ctx.appConfig.apiHost+'/productCalendar/queryByMonth'
            };
            communication(ctx, productOption, resolve, reject);
        });
    },
    getProductsEndByTime: (ctx, conditions) => {
        return new Promise(function(resolve, reject){
            let productOption = {
                method: 'GET',
                qs: conditions,
                url: ctx.appConfig.apiHost+'/productCalendar/queryByMonth'
            };
            communication(ctx, productOption, resolve, reject);
        });
    },
    getProductsByName: (ctx, conditions) => {
        return new Promise(function(resolve, reject){
            let userInfoOption = {
                method: 'GET',
                qs: conditions,
                url: ctx.appConfig.apiHost+'/productCalendar/queryByName'
            };
            communication(ctx, userInfoOption, resolve, reject);
        });
    }
};

module.exports = productInterface;