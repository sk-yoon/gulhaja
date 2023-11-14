var express = require('express');
/*
var http = require('http');
var path = require('path');
var static = require('serve-static');
*/
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var multer = require('multer');
//var fs = require('fs');
var cors = require('cors');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

app.use(cors()); //ajax 요청시 CORS(다중서버접속) 지원
 
var storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, './uploads')
    },
    filename: function (req, file, callback){
        callback(null, Date.now() + '-' + file.originalname )
    }
});
 
var upload = multer({
    storage: storage,
    limits: {
        files: 10, //파일개수제한 10개
        fileSize: 1024 * 1024 * 1024 //파일크기제한 1GB
    }
});

router.get("/", function(req, res) {
    res.sendfile("conf/setting.html");
});

router.route('/uploadFile').post(upload.single('file'), function(req, res) {
    console.log('/uploadFile 호출됨');
    try {
        var file = req.file;
        
        console.dir('#-----업로드된 파일 정보-----#')
        console.dir(req.file);
        console.dir('#----- 같이 입력된 정보-----#')
        console.dir(req.body.title);
        console.dir(req.body.seq);
        console.dir(req.body);
        var originalname = '', filename = '', mimetype = '', size = 0;

        originalname = file.originalname;
        filename = file.filename;

        res.send({
            message: "파일 업로드가 완료되었습니다.",
          });
        //res.writeHead('200', {
         //   'Content-Type': 'text/html;charset=utf8'
        //});
        //res.write('<h1>업로드 성공</h1>');
        //res.write('<p>원본 파일이름: ' + originalname + '-> 저장 파일이름: ' + filename + '</p>');
        res.end();
    } catch(err) {
        console.dir(err.stack);
    }
});

module.exports = router;