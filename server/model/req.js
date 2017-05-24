var request = require('request');
var q = require('q');
var fs = require('fs');

module.exports.action = function(method , url , options , body){
    var d = q.defer();
    if(!options){
        options = {
            headers : {}
        }
    }
    options.method = method;
    options.url = url;
    if(method == 'POST'){
        options.body = body;
    }
    request( options ,
    function (error, response, res_body) {
        if (error) {
            return console.error('upload failed:', error);
            throw error
        }
        return d.resolve(res_body);
    })
    return d.promise;
}
