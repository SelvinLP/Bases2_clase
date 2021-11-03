var mysql = require('mysql');
var cred = require('../credentials/credintials');
var pool = mysql.createPool(cred);

pool.getConnection((err,connection) => {
    if(connection){
        connection.release();
        console.log("DB is connected")
    }else{
        console.log(err)
    }
    return;
});

module.exports = pool;
