
app.component('appElement', {
    transclude: true,
    template :  "<top-side class='col-md-12'></top-side>" +
                "<left-side  class='col-md-3'></left-side>" +
                "<account-limited class='col-md-9'></account-limited> <ng-outlet></ng-outlet>" ,
    bindings : {
        status : '<',
    },
    scope : {
        status : 'yes'
    },
    controller : ctrl
});

function ctrl(){
    var appComponent = this;
    this.onChange = function(){

    }
    this.$onInit = function(){
        this.status = 'yes'
        console.log();
    }

    this.setStatus = function(status){
        console.log('status' ,status);
    }


}
