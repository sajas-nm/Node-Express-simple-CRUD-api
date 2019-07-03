//db Configuration
var mysql = require('mysql')
 var con = mysql.createConnection({
    host : 'db4free.net',
    user : 'saajid',
    password : '12341234',
    database : 'saajid_test_db'
 })
 con.connect()
 module.exports=con
 