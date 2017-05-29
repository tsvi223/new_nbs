var DBAccountLimited = require('../db/accounts-limited');
var request = require('./req');
var xray = require('x-ray');
var q = require('q');
var strings = require('./strings');

function checkLimitedScrapingAccount(bank , branch , acount_number){
    var d = q.defer();
    var url = strings.url_scraping_account + 'Bank=' + bank + '&Branch=' + branch + '&Account=' + acount_number;
    request.action('GET' , url).then(function(html){ 
        var x = xray();
        x(html , strings.xray.selector_account , { txt : '@html' }  )(function(err , obj){
            if(!obj.txt) return  d.resolve({status : 'correct'});
            var result_xray = obj.txt.trim();
            if(result_xray == strings.xray.string_compare_account){
              var result = {
                status : 'correct'
              }
            }
            else{
              var expired = result_xray.replace(/Restricted account until|\r|\n|\s|/g, "").trim();
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
    var url = strings.url_scraping_personal + id;
    request.action('GET' , url).then(function(html){
        var x = xray();
        x(html , strings.xray.selector_personal , { txt : '@html' }  )(function(err , obj){
            var txt =  obj.txt.trim().replace(/Number  does|<span class="BoiRestrictedCircumstancesCaseId"><\/span>/g , '')
            if(txt.indexOf(strings.xray.string_compare_persoanl) == -1)
                return d.resolve('limited');
            else
                return d.resolve('correct');
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
    return DBAccountLimited.checkAccounts(account).then(function(result){
         var status = '';
         if(!result) status = 'correct';
         if(result) status = 'limited';
        return status;
    })
}

module.exports.action = function(req , res , next){
    switch (req.params.action) {
        case 'sql' : {
            checkLimitedDB(req.body.bank , req.body.branch , req.body.account).then(function(status){
                return res.json({ status : status });
            })
        }
        break;
        case 'scrape-account' : {
            checkLimitedScrapingAccount(req.body.bank , req.body.branch , req.body.account).then(function(status){
                return res.json(status);
            })
        }
        break;
        case 'scrape-personal' : {
            checkLimitedScrapingPersonal(req.body.id).then(function(status){
                return res.json({ status : status });
            })
        }
        break;
    }
}
