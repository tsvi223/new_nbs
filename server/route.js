var fs = require('fs');
var check_limited = require('./model/check-limited')

module.exports = function(app) {
	app.all('/' , function(req, res, next){ console.log('here');
        fs.readFile('../index.html' , function(err , data){
            return res.send(data.toString());
        })
	})
	app.all('/checkLimited/:action' , check_limited.action)

}
