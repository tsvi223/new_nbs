app.component('accountLimited', {
  templateUrl: 'app/components/html/accountLimited.html',
  controller: accountLimitedComponent,
})
.component('checkForm' , {
    templateUrl: 'app/components/html/checkForm.html',
    controller: checkFormComponent,
    bindings :{
        branch : '<',
        account : '<',
        bank : '<',
        check : '<',
        namePerson : '<',
        IDPerson : '<',
        changeCallback: '&',
    }
})

function accountLimitedComponent(){
}

function checkFormComponent($rootScope , accountLimitedService){
    var view = this;
    view.list_inputs = [
        { textHolder : view.bank , name : 'account' ,  txt : 'חשבון' , status :  false } ,
        { textHolder : view.branch ,  name : 'branch' ,  txt : 'סניף' , status :  false } ,
        { textHolder : view.bank , name : 'bank' ,   name : 'bank' , txt : 'בנק' , status :  false } ,
        { textHolder : view.numCheck , name : 'check' ,  txt : 'מס ציק', status :  false } ,
        { textHolder : view.name ,  name : 'namePerson',  txt : 'שם' , status :  false } ,
        { textHolder : view.id ,  name : 'IDPerson',  txt : 'מ.ז / תאגיד' , status :  false }
    ]
    view.changePerson = function(){ console.log(view.IDPerson);
        view.status = 'pending';
        if(!view.IDPerson) {
            view.list_inputs[view.list_inputs.length - 1].status = false;
            $rootScope.$emit('close status');
            return;
        }
        view.list_inputs[view.list_inputs.length - 1].status = 'pending';
        accountLimitedService.checkLimitedPersonal( view.IDPerson).then(function(result){
          if(result.status == 'limited')  view.list_inputs[view.list_inputs.length - 1].txt = 'לקוח מוגבל';
          if(result.status == 'correct')  view.list_inputs[view.list_inputs.length - 1].txt = 'לקוח תקין';
            view.list_inputs[view.list_inputs.length - 1].status =  result.status;
            view.status = result.status;
            var sendDetails = {
                account : view.IDPerson,
                type : 'person',
                status : result.status
            }

            $rootScope.$emit('send status' , sendDetails);
        })
    }
    view.changeAccount = function(){
        console.log(view.branch ,view.bank, view.account);
        if(!view.branch || !view.bank || !view.account){
            view.list_inputs[0].status = false;
            $rootScope.$emit('close status');
            return;
         }
        var accountCheck = {
            account : view.account,
            bank : view.bank,
            branch : view.branch
        }
        view.list_inputs[0].status = 'pending';
        accountLimitedService.checkLimited(accountCheck).then(function(result){
            view.list_inputs[0].status = result.status;
            if(result.status == 'limited')  view.list_inputs[0].txt = 'חשבון מוגבל';
            if(result.status == 'correct')  view.list_inputs[0].txt = 'חשבון תקין';
            console.log(view.list_inputs[0]);
            var sendDetails = {
                account : view.account,
                type : 'account',
                status : result.status,
                expired : result.expired
            }
            $rootScope.$emit('send status' , sendDetails);
        })
    }
}
