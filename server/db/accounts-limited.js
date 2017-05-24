var mysql = require('./connect');

var statements = {
  add_account : 'INSERT INTO accounts_limited SET :account',
  accounts : 'SELECT * FROM accounts_limited',
  check_accounts : 'SELECT * FROM accounts_limited WHERE bank = :bank && account = :account && branch = :branch'
};

module.exports ={
    checkAccounts : function(account){
        return mysql.Query(statements.check_accounts, {account : account});
    },
    addAccount :  function(account){
        return mysql.Query(statements.add_account, {account : account});
    },
    accounts : function(){
        return mysql.Query(statements.accounts);
    }
}
