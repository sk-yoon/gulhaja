// Maria DB Connection Setting
var maria = require('mysql');

var dbConn = maria.createConnection({
    host : 'svc.sel5.cloudtype.app',
    port:32191,
    user:'gulhaja',
    password:'1234',
    database:'display'
});

module.exports = dbConn;