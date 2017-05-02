/**
 * Numbers are left untouched
 * Booleans are converted to true / false
 * Date objects are converted to 'YYYY-mm-dd HH:ii:ss' strings
 * Buffers are converted to hex strings, e.g. X'0fa5'
 * Strings are safely escaped
 * Arrays are turned into list, e.g. ['a', 'b'] turns into 'a', 'b'
 * Nested arrays are turned into grouped lists (for bulk inserts), e.g. [['a', 'b'], ['c', 'd']] turns into ('a', 'b'), ('c', 'd')
 * Objects are turned into key = 'val' pairs for each enumerable property on the object. If the property's value is a function, it is skipped; if the property's value is an object, toString() is called on it and the returned value is used.
 * undefined / null are converted to NULL
 * NaN / Infinity are left as-is. MySQL does not support these, and trying to insert them as values will trigger MySQL errors until they implement support.
 */
module.exports = (ctx, options) => {
    options.values = options.values || [];
    return new Promise(function(resolve, reject){
        var connection = ctx.mysql;
        connection.query(options.sql, options.values, function(err, rows, fields){
            if(err){
                reject(err);
            }else{
                resolve(rows);
            }
        });
    });
}