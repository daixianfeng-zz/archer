module.exports = {
    monthApiTrans: (ctx, month) => {
        try{
            let dateNow = new Date();
            let apiMonth = '' + dateNow.getFullYear() + (dateNow.getMonth()+1);
            if(month){
                apiMonth = month.split('-').join('');
            }
            return apiMonth;
        }catch(err){
            ctx.errorLog.error('params error:'+"\n"+e.stack);
            ctx.throw('Request Error', 500);
        }
    }
}