(function(angular) {
  'use strict';
angular.module('requset' , [])
    .factory('serverRequest', serverRequest);

function serverRequest($http,$rootScope,  $q){
    var service = {};
    service.API  = function(url, data) {
        var d = $q.defer();
        var options = {
            url :   url,
        }
        if(data){
            options.method = 'POST';
            options.data = data;
        }
        else options.method = 'GET';
        $http(options).then(function success(res) {
            console.log('request : ' , res);
            return d.resolve(res.data);
        }, function error(error){
            return d.reject(error);
        });

        return d.promise;
    };
    return service;
}
})(window.angular);
