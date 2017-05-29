var DBAccountLimited = require('../db/accounts-limited');
var request = require('./req');
var xray = require('x-ray');
var q = require('q');


function checkLimitedScrapingAccount(bank , branch , acount_number){  console.log(bank , branch , acount_number);
    var d = q.defer();
    var url = 'http://www.boi.org.il/_layouts/boi/handlers/WebPartHandler.aspx?wp=RestrictedAccountsSearch&lang=en&' +
              'Bank=' + bank + '&Branch=' + branch + '&Account=' + acount_number;
    request.action('GET' , url).then(function(html){
        var x = xray();
        x(html ,'div .BoiRestrictedAccountsRestricted' , { txt : '@html' }  )(function(err , obj){ console.log(obj);
            if(!obj.txt) return  d.resolve({status : 'correct'});
            var result_xray = obj.txt.trim();
            if(result_xray == 'The account number you have entered is not on the list of restricted accounts'){         console.log('result if :: ');
              var result = {
                status : 'correct'
              }
            }
            else{
              var expired = result_xray.replace(/Restricted account until|\r|\n|\s|/g, "").trim();
              console.log(expired);
              var result = {
                status : 'limited',
                expired : expired
              }
            }
            return d.resolve(result);
        })

    })
    return d.promise;
}

function checkLimitedScrapingPersonal(id){
    var d = q.defer();
    var url = 'http://www.boi.org.il/_layouts/boi/handlers/WebPartHandler.aspx?wp=RestrictedAccountsSearch' +
                '&lang=en&Company=' + id

    request.action('GET' , url).then(function(html){
        var x = xray();
        x(html ,'div .BoiRestrictedCircumstancesCaseResult div' , { txt : '@html' }  )(function(err , obj){ console.log(obj);
            var txt =  obj.txt.trim().replace(/Number  does|<span class="BoiRestrictedCircumstancesCaseId"><\/span>/g , '')
            if(txt.indexOf('not appear on the list') == -1)
                return d.resolve('limited')
            else
                return d.resolve('correct')
        })

    })
    return d.promise;
}

function checkLimitedDB(bank , branch , acount_number){
    var account = {
        bank : bank,
        branch : branch,
        account : acount_number
    }
    console.log(account);
    return DBAccountLimited.checkAccounts(account).then(function(result){ console.log(result);
         var status = '';
         if(!result) status = 'correct';
         if(result) status = 'limited';
        return status;
    })
}

module.exports.action = function(req , res , next){ console.log(req.params.action);
    switch (req.params.action) {
        case 'sql' : {
            checkLimitedDB(req.body.bank , req.body.branch , req.body.account).then(function(status){
                return res.json({ status : status })
            })
        }
        break;
        case 'scrape-account' : {
            checkLimitedScrapingAccount(req.body.bank , req.body.branch , req.body.account).then(function(status){
                return res.json(status)
            })
        }
        break;
        case 'scrape-personal' : {
            checkLimitedScrapingPersonal(req.body.id).then(function(status){
                return res.json({ status : status })
            })
        }
        break;
    }
}
