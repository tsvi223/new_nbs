(function(angular) {
  'use strict';
angular.module('home')
  .component('home', {
    template: '<h2>You in Home</h2><ng-outlet></ng-outlet><carslist/>',
    $routeConfig: [
      {path:'/',    name: 'Carslist',   component: 'carslist', useAsDefault: true},
      {path:'/:id', name: 'CarDetail', component: 'carDetail'}
    ]
  })
  .component('carslist', {

    // template:
    //   '<ul>\n' +
    //   '  <li class="car-row" ng-repeat="car in $ctrl.cars"\n' +
    //   '    ng-class="{ selected: $ctrl.isSelected(car) }"\n' +
    //   '    ng-click="$ctrl.onSelect(car)">\n' +
    //   '    <span class="">{{car.id}}</span> {{car.manufacturer}}\n' +
    //   '  </li>\n' +
    //   '</ul>\n',

    templateUrl: 'app/components/home/carlist.html',
    bindings: { $router: '<' },
    controller: CarsListComponent,
    $canActivate: function($nextInstruction, $prevInstruction) {
      console.log('$canActivate', arguments);
    }
  })
  .component('carDetail', {
    templateUrl: 'app/components/home/carDetails.html',
    bindings: { $router: '<' },
    controller: CarDetailComponent
  });
//
//

//
//   this.getCrisis = function(id) {
//     return crisesPromise.then(function(crises) {
//       for (var i = 0; i < crises.length; i++) {
//         if (crises[i].id === id) return crises[i];
//       }
//     });
//   };
// }
//
    function CarsListComponent(carsService) {
        var selectedId = null;
        var ctrl = this;
        this.$routerOnActivate = function(next) {
            console.log('$routerOnActivate', this, arguments);
            carsService.getCars().then(function(cars) {
                ctrl.cars = cars;
                selectedId = next.params.id;
                console.log('next',selectedId);
            });
        };
        this.isSelected = function(car) {
            return (car.id === selectedId);
        };

        this.onSelect = function(car) {
            this.$router.navigate(['CarDetail', { id: car.id }]);
        };
    }

function CarDetailComponent(carsService) {
  var ctrl = this;
  this.$routerOnActivate = function(next) {
    var id = next.params.id;
    carsService.getCar(id).then(function(car) {
      if (car) {
        ctrl.editManufacturer = car.manufacturer;
        ctrl.car = car;
      } else { // id not found
          console.log('not found');
    //    ctrl.gotoCrises();
      }
    });
  };
//
//   this.$routerCanDeactivate = function() {
//     // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged.
//     if (!this.crisis || this.crisis.name === this.editName) {
//       return true;
//     }
//     // Otherwise ask the user with the dialog service and return its
//     // promise which resolves to true or false when the user decides
//     return dialogService.confirm('Discard changes?');
//   };
//
//   this.cancel = function() {
//     ctrl.editName = ctrl.crisis.name;
//     ctrl.gotoCrises();
//   };
//
//   this.save = function() {
//     ctrl.crisis.name = ctrl.editName;
//     ctrl.gotoCrises();
//   };
//

  this.gotoCars = function() {
    var carId = ctrl.car && ctrl.car.id;
    console.log(carId);
    // Pass along the hero id if available
    // so that the CrisisListComponent can select that hero.
    this.$router.navigate(['Carslist', {id: carId}]);
  };

 }
})(window.angular);
