var sql = require('./connect_postgress');

var statements = {
  add_account : 'INSERT INTO accounts_limited SET :account',
  accounts : 'SELECT * FROM accounts_limited',
  check_accounts : 'SELECT * FROM test_nbs_accountlimited WHERE bank = :bank AND branch = :branch AND account = :account'
};

module.exports ={
    checkAccounts : function(account){
        return sql.Query(statements.check_accounts,  account);
    },
    addAccount :  function(account){
        return sql.Query(statements.add_account, {account : account});
    },
    accounts : function(){
        return sql.Query(statements.accounts);
    }
}
