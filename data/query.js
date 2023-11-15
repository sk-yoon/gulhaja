var express = require('express');
var router = express.Router();

const maria = require("../db/maria");        // mariaDB Connect
maria.connect();

router.use(express.json());

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

router.get("/writers", function(req,res) {
    maria.query(
        "SELECT * FROM WRITTER",function(err, rows, fields) {
            if (!err) {
                res.send(rows);
            } else {
                console.log("err : " + err);
                res.send(err);
            }
    });
});

router.get("/writer", function(req,res) {
    //console.log(req.query.name);
    var sql = "SELECT * FROM WRITTER WHERE NAME LIKE '%" + req.query.name + "%'";
    //console.log(sql);
    maria.query(
        sql, function(err, rows, fields) {
            if (!err) {
                res.send(rows);
            } else {
                console.log("err : " + err);
                res.send(err);
            }
    });
});

router.post("/writer", function(req,res) {
    var body = req.body;
    var params = [body.name, body.affiliation, body.grade, body.writeNo];

    var sql = "INSERT INTO WRITTER (NAME,  AFFILIATION, GRADE,  WRITER_NO)    \
            VALUES (?, ?, ?, ?);";
    var insertSql = maria.format(sql, params);

    maria.query(
        insertSql, function(err, rows, fields) {
            if (!err) {
                return res.json("추가 성공");
            } else {
                console.log("err : " + err);
                return res.json(err);
            }
    });
});

router.delete("/writer", function(req, res) {
    var id = req.body.id;

    var sql = "DELETE FROM WRITTER WHERE ID = ?";
    var delSql = maria.format(sql, id);

    maria.query(
        delSql, function(err, rows, fields) {
            if (!err) {
                return res.json("삭제 성공");
            } else {
                console.log("err : " + err);
                return res.json(err);
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

router.put("/conf/set", function (req, res) {
    var body = req.body;
    var keys = Object.keys(body);

    if (keys.length == 0) {
        console.log("key length : " + keys.length);
        return res.send("환경 변수 설정값이 없습니다. Error!");
    }
    
    let sql = "UPDATE CONFIG SET ";

    for (const key of Object.keys(body)) {
        if(key == "interval") {
            sql += "PAGE_INTERVAL = " + body.interval;
        }
    }

    maria.query(sql, function (err, rows, fields) {
        if (!err) {
            return res.json("변경 성공");
        } else {
            console.log("err : " + err);
            return res.send(err);
        }
    });
});



module.exports = router;