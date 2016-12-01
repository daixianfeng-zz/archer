const request = require('request');

const productModel = {
    getProductList: (ctx) => {
        return new Promise(function(resolve, reject){
            let listOption = {
                url: '/product/products.json',
                headers: Object.assign(ctx.request.header,{from: 'nodejs'})
            };
            request(listOption, function(err, response, body){
                if(err){
                    reject(err); 
                }
                try{
                    var productList = JSON.parse(body);
                    resolve(productList);
                }catch(e){
                    reject(e);
                }
            });
        });
    }
};


    
module.exports = productModel;