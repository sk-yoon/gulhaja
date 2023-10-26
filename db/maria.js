const maria = require("mysql");

const conn = maria.createConnection({
  host: "localhost",
  post: 3306,
  user: "gulhaja",
  password: "1234",
  database: "display",
});

module.exports = conn;
