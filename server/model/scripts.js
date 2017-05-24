var request = require('request');
var q = require('q');
var fs = require('fs');
var xray = require('x-ray');


//console.log(request);


function req(method , url , options , body){
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

//
// fs.readFile('car-rest.html', function(err , data){
//         if(err) console.log(err);
//         var html = data.toString()
//     //    console.log('success' , html);
//         var x = xray();
//        console.log(x);
//        var cars_details = [];
//         x(html ,'table tr' , {tr : ['@html']  })(function(err , obj){
//             var list = obj.tr;
//             list.forEach(function(item){
//                 var part_details = item.split('</td><td><strong>');
//                 //console.log(part_details[0].trim().replace('<td>', ''));
//                 if(part_details[1]){
//                     x(item ,['td' ] )(function(err , obj_details){
//                         var detail = {
//                              type : obj_details[0],
//                             value : obj_details[1]
//                         }
//                         cars_details.push(detail);
//                     })
//                 }
//             })
//             console.log(cars_details);
//         })
//
// })
// req('GET' , 'https://www.auto-data.net/en/?f=showCar&car_id=22837').then(function(html){
//         console.log(html);
//         fs.writeFile('car-rest.html' , html , function(err , data){
//             if(err) console.log(err);
//             console.log('success');
//         })
// })


req('GET' ,
'http://www.boi.org.il/_layouts/boi/handlers/WebPartHandler.aspx?wp=RestrictedAccountsSearch&lang=en&Company=300446887'
).then(function(html){
    var x = xray();
    //console.log(html);
    x(html ,'div .BoiRestrictedCircumstancesCaseResult div' , { txt : '@html' }  )(function(err , obj){
        var txt =  obj.txt.trim().replace(/Number  does|<span class="BoiRestrictedCircumstancesCaseId"><\/span>/g , '')
        console.log(txt.indexOf('not appear on the list'));
    })

})





var arr = [ {a : 1} , { b : 2 } ];

var filt =  arr.filter(function(item){
    if(item['a'] == 2 ) return item;
})
console.log();
