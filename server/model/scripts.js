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





function fixQuery(query , values){
    var test = query.match(/:.\S+/g)

    var result = {
         query : query ,
         values : []
     }
    test.forEach(function(item , index){
        result.query = result.query.replace(item , '$' + (index + 1) )
        item = item.replace(':' , '');
        result.values.push(values[item])
    })
    console.log(result);
    return result
}

function fixQuery2(text , values){
    var query_parameter = text.match(/:.\S+/g)

    var result = {
         text : text ,
         values : []
     }

    query_parameter.forEach(function(item , index){
        result.text = result.text.replace(item , '$' + (index + 1) )
        item = item.replace(':' , '');
        result.values.push(values[item])
    })
    console.log(result);
    return result
}

fixQuery2('SELECT * FROM test_nbs_accountlimited WHERE bank = :bank AND branch = :branch AND account = :account' , { account : 11 , branch : 22 , bank : 45 } )
