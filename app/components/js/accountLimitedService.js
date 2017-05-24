
app.service('accountLimitedService', accountLimitedService)
function accountLimitedService(serverRequest) {

    var service = {};
    service.checkLimited = function(account) {
        service.resultCheck = serverRequest.API('/checkLimited/scrape-account' , account);
        return service.resultCheck;
    };
    service.checkLimitedPersonal = function(id) {
        service.resultCheckPersonal = serverRequest.API('/checkLimited/scrape-personal' , {id : id });
        return service.resultCheckPersonal;
    };
    return service;
}
