var query = require('../service/query');

const indexModel = {
    getIndex: async (ctx) => {
        try{
            var indexInfo = await query(ctx, {
                sql: 'SELECT * FROM `index` WHERE `index_id` > ? AND `index_id` < ?',
                values: [5, 10]
            });
            return JSON.stringify(indexInfo);
        }catch(e){
            console.log(e);
            ctx.throw('Index get Error', 500);
        }
    },
    insertOne: async (ctx) => {
        try{
            var indexInfo = await query(ctx, {
                sql: 'INSERT INTO `index` (intro) valuse ?',
                values: [['opq'],['rst']]
            });
            return indexInfo;
        }catch(e){
            ctx.throw('Index insert Error', 500);
        }
    }
};

module.exports = indexModel;