var express = require("express");
var router = express.Router();

// require maria.js
const maria = require("../db/maria");


// 조회
router.get("/select", function (req, res) {
  maria.query("SELECT * FROM EBOOK ORDER BY SEQ", function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      console.log("err : " + err);
      res.send(err);
    }
  });
});

module.exports = router;
