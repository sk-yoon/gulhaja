var express = require('express');
var router = express.Router();

const maria = require("../db/maria");        // mariaDB Connect
maria.connect();


router.get("/showEbooks", function(req, res) {
    maria.query(
        "SELECT \
            B.ID, B.SEQ, B.TITLE, B.FILENAME, B.SHOW_YN, \
            W.ID as W_ID, W.NAME, W.AFFILIATION, W.GRADE, W.WRITER_NO \
        FROM EBOOK B \
            RIGHT JOIN WRITTER W on B.WRITER_ID = W.ID \
        WHERE \
            B.SHOW_YN = 'Y' \
        ORDER BY SEQ;",
    function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      console.log("err : " + err);
      res.send(err);
    }
  });
});

router.get("/conf", function (req, res) {
    maria.query("SELECT * FROM CONFIG", function (err, rows, fields) {
        if (!err) {
            res.send(rows);
        } else {
            console.log("err : " + err);
            res.send(err);
        }
    });
});




module.exports = router;