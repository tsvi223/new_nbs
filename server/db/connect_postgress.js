var pg = require('pg');
var config = require('./config_postgress');
var q = require('q');

var pool = new pg.Pool(config);


pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});




module.exports.Query = function (text, values) {
    var d = q.defer();
    console.log('query:', text, values);
    var query_fixed = fixQuery(text, values)
    pool.query(query_fixed.text, query_fixed.values, function(err, res){ console.log( err , res );
        if(err) return d.reject(err);
        if(!res.rows[0])  return d.resolve(null);
        if(!res.rows[1])  return d.resolve(res.rows[0]);
        else  return d.resolve(res.rows)
    });

    return d.promise;
};


module.exports.connect = function (callback) {
    return pool.connect(callback);
};






function fixQuery(text , values){
    var query_parameter = text.match(/:.\S+/g)

    var result = {
         text : text ,
         values : []
     }
    if(!query_parameter){
        result.test = text;
        return result;
    }
    query_parameter.forEach(function(item , index){
        result.text = result.text.replace(item , '$' + (index + 1) )
        item = item.replace(':' , '');
        result.values.push(values[item])
    })
    console.log(result);
    return result
}
