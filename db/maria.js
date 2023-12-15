// Maria DB Connection Setting
var maria = require('mysql');

var dbConn = maria.createConnection({
    host : 'svc.sel5.cloudtype.app',
    port:32191,
    user:'gulhaja',
    password:'1234',
    database:'display',
    multipleStatements: true
});

var localDbConn = maria.createConnection({
    host : 'localhost',
    port:3306,
    user:'gulhaja',
    password:'1234',
    database:'display',
    multipleStatements: true
});

module.exports = localDbConn;