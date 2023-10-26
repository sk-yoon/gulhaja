const maria = require("mysql");



const conn = maria.createConnection({
  host: "svc.sel5.cloudtype.app",
  post: 32191,
  user: "gulhaja",
  password: "1234",
  database: "display",
});

module.exports = conn;
