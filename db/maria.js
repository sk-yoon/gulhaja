const maria = require("mysql");



const conn = maria.createConnection({
  host: "127.0.0.1",
  post: 3309,
  user: "gulhaja",
  password: "1234",
  database: "display",
});

module.exports = conn;
