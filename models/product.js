const request = require('request');
const productInterface = require('./interface/product');

const productModel = {
    getProductsSummary: async (ctx, conditions) => {
        try{
            var info = await Promise.all([productInterface.getSummaryByMonth(ctx, conditions)]);
            return Object.assign({error: 0}, JSON.parse(info[0]));
        }catch(e){
            ctx.errorLog.error('Get products error:'+"\n"+e.stack);
            ctx.throw('Request Error', 500);
        }
    },
    getProductsByMonth: async (ctx, conditions) => {
        try{
            let startForms = {
                startRaiseMonth: conditions.month
            };
            let endForms = {
                productEndMonth: conditions.month
            };
            var info = await Promise.all([productInterface.getProductsStartByTime(ctx, startForms), productInterface.getProductsEndByTime(ctx, endForms)]);
            return {
                error: 0,
                startProducts: JSON.parse(info[0]),
                endProducts: JSON.parse(info[1])
            };
        }catch(e){
            ctx.errorLog.error('Get products error:'+"\n"+e.stack);
            ctx.throw('Request Error', 500);
        }
    },
    getProductByName: async (ctx, conditions) => {
        try{
            var info = await Promise.all([productInterface.getProductsByName(ctx, conditions)]);
            let result = JSON.parse(info[0])[0] || null;
            return {
                error: 0,
                product: result
            };
        }catch(e){
            ctx.errorLog.error('Get products error:'+"\n"+e.stack);
            ctx.throw('Request Error', 500);
        }
    }
};

module.exports = productModel;