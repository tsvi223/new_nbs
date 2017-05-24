(function(angular) {
  'use strict';
angular.module('home', ['requset'])
.service('carsService', CarsService)
    function CarsService(serverRequest) {
        var service = {};
        
        service.getCars = function() {
            service.cars = serverRequest.API('/cars/list');
            return service.cars
        };
        service.getCar = function(id) {
            return service.cars.then(function(cars) {
                 for (var i = 0; i < cars.length; i++) {
                   if (cars[i].id === id) return cars[i];
                 }
             });
        };
        return service;
    }
})(window.angular);
