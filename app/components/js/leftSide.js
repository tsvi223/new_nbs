
    app.component('leftSide', {
        template: '<status-account>here<status-account><ng-outlet></ng-outlet>',
        require : {
        parent : '^appElement'
        },
        controller: leftSideComponent
    })
    .component('statusAccount', {
        require : {
        parent : '^appElement'
        },
        templateUrl: 'app/components/html/statusAccount.html',
        controller: statusAccountComponent,
        bindings:{
            status : '<'
        }
    })
    function leftSideComponent() {
    }

    function statusAccountComponent($scope , $rootScope){
        var leftSideCtrl = this;
        leftSideCtrl.status = false;
        leftSideCtrl.accountNum = '';
        $rootScope.$on('close status' , function(){
            leftSideCtrl.status = false;
        });
        $rootScope.$on('send status' , function(evn , arg){
            console.log('1' , arg);
            leftSideCtrl.status = arg.status;
             if(arg.status == 'correct') leftSideCtrl.statusText = getTextStatus(arg.type , 'correct_text') ;
             if(arg.status == 'limited') leftSideCtrl.statusText = getTextStatus(arg.type , 'limited_text' , arg.account , arg.expired);
        })
}


function getTextStatus(type, typeStatus , accountNum , expired){ console.log(type, typeStatus , accountNum);
    var correctTextAccount = {
        head : 'חשבון תקין',
        details : "חשוב לדעת, המידע המתקבל מבנק ישראל אינו כולל מספר החרגות.",
        hideDetails : {
            show : false,
            txt : [
                '  על פי החוק, אין המידע על הלקוחות המוגבלים בנסיבות מחמירות כולל:' ,
                '1. ללקוחות מוגבלים בנסיבות מיוחדות שהוגבלו על ידי בית המשפט בהליך פשיטת רגל, ההוצאה לפועל, בית דין רבני והמרכז לגביית קנסות אגרות והוצאות.' ,
                '2. לקוחות שהגישו ערעור על הגבלתם לבית משפט השלום.' ,
                '3. לקוחות שלא עברו 60 יום ממועד משלוח ההודעה על הגבלתם.' ,
                '4. אין המידע על הלקוחות המוגבלים בנסיבות מחמירות כולל לקוחות תושבי חוץ שהוגבלו עם מספרי דרכון.'
            ]
        }
    }
    var limitedTextAccount = {
        head : 'חשבון מוגבל',
        details : 'ע"פ נתוני בנק ישראל, מספר חשבון ' +  accountNum  + '  מוגבל.',
        expired : 'החשבון מוגבל עד ' + expired + '.' 
    }


    var correctTextPersonal = {
        head : 'לקוח תקין',
        details : "חשוב לדעת, המידע המתקבל מבנק ישראל אינו כולל מספר החרגות.",
        hideDetails : {
            show : false,
            txt : [
                '  על פי החוק, אין המידע על הלקוחות המוגבלים בנסיבות מחמירות כולל:' ,
                '1. ללקוחות מוגבלים בנסיבות מיוחדות שהוגבלו על ידי בית המשפט בהליך פשיטת רגל, ההוצאה לפועל, בית דין רבני והמרכז לגביית קנסות אגרות והוצאות.' ,
                '2. לקוחות שהגישו ערעור על הגבלתם לבית משפט השלום.' ,
                '3. לקוחות שלא עברו 60 יום ממועד משלוח ההודעה על הגבלתם.' ,
                '4. אין המידע על הלקוחות המוגבלים בנסיבות מחמירות כולל לקוחות תושבי חוץ שהוגבלו עם מספרי דרכון.'
            ]
        }
    }
    var limitedTextPersonal = {
        head : 'לקוח מוגבל',
        details : 'ע"פ נתוני בנק ישראל, לקוח בעל זיהוי ' +  accountNum  + ' מוגבל בנסיבות מחמירות.'

    }

    var result = {}
    switch (type) {
        case 'person':{
            switch (typeStatus) {case 'correct_text':  result = correctTextPersonal; break; case 'limited_text': result = limitedTextPersonal;  break;}
        }
        break;
        case 'account':   { console.log(typeStatus);
            switch (typeStatus) {case 'correct_text':  result = correctTextAccount; break; case 'limited_text': result = limitedTextAccount;  break;}
        }
        break;
        default :

    }
    console.log(result);
    return result;

}
