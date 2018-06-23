var config = module.exports;

var PRODUCTION = process.env.NODE_ENV === 'production';

config.restify = {
    port:  process.env.RESTIFY_PORT || 10001
}

config.mysql = {
    connectionLimit : process.env.CONNECTION_LIMIT || 10,
    port     : 3306,
    host     : 'mysqld1.c2zznl13wlqp.us-east-2.rds.amazonaws.com',
    user     : 'sa',
    password : 'backups01',
    database : 'gaa'
}

if(PRODUCTION){
    
}