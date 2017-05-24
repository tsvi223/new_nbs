var mysql   = require('mysql');
var q       = require('q');
var config  = require('./config');

var connection = mysql.createConnection(config);

connection.config.queryFormat = function (query, values) {
  if (!values) return query;
  return query.replace(/\:(\w+)/g, function (txt, key) {
    if (values.hasOwnProperty(key)) {
      return this.escape(values[key]);
    };
    return txt;
  }.bind(this));
};


function MySQLConnect(){
 if(MySQLConnect.instance !== undefined){
    console.log('Connection Exist');
    return MySQLConnect.instance;
  }

    console.log('Creating MySQL Connection')
    var object = connection;
    connection.connect();
    MySQLConnect.instance = object;
}

MySQLConnect.prototype.Query = function(statement, variables, array){
  var instance = MySQLConnect.instance;
  var d = q.defer();

  instance.query(statement, variables, function( err, rows){
    if (rows) {
      if(rows.length === 1 && !array) return d.resolve(rows[0]);
      else if(rows.length === 0 ) return d.resolve(null);
      else return d.resolve(rows);
    }
    else if (err) {
       return d.reject(err)
    }
  });

  return d.promise;
};

module.exports =  new MySQLConnect();
