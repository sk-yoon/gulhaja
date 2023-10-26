var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var static = require('serve-static');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var multer = require('multer');
var fs = require('fs');
var cors = require('cors');
 
var app = express();
var router = express.Router();
const $ = require("jquery");

// mariaDB Connect

const maria = require("./db/maria");
maria.__dirname;

// 조회
router.get("/ebook/select", function (req, res) {
  maria.query("SELECT * FROM EBOOK ORDER BY SEQ", function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      console.log("err : " + err);
      res.send(err);
    }
  });
});

 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));
app.use('/assets', static(path.join(__dirname, 'assets')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

 
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));
 
app.use(cors()); //ajax 요청시 CORS(다중서버접속) 지원
 
var storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, 'uploads/')
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
 
router.route('/process/file').post(upload.array('file', 1), function(req, res){
    console.log('/process/file 호출됨');
    
    try{
        var files = req.files;
        
        console.dir('#-----업로드된 파일 정보-----#')
        console.dir(req.files[0]);
        console.dir('#------#')
        
        var originalname = '', filename = '', mimetype = '', size = 0;
        
        if(Array.isArray(files)){
            console.log("배열 파일 갯수: %d", files.length);
            
            for(var i=0; i<files.length; i++){
                originalname = files[i].originalname;
                filename = files[i].filename;
                mimetype = files[i].mimetype;
                size = files[i].size;
            }
        }
        
        console.log("현재 파일 정보: " + originalname + ', ' + filename + ', ' + mimetype + ', ' + size);
        
        res.writeHead('200', {
            'Content-Type': 'text/html;charset=utf8'
        });
        res.write('<h1>업로드 성공</h1>');
        res.write('<hr />');
        res.write('<p>원본 파일이름: ' + originalname + '-> 저장 파일이름: ' + filename + '</p>');
        res.write('<p>MIMETYPE: ' + mimetype + '</p>');
        res.write('<p>SIZE: ' + size + '</p>');
        res.end();
    } catch(err) {
        console.dir(err.stack);
    }
});
 

app.use('/', router);
 
http.createServer(app).listen(3000, function () {
    console.log('Express 서버가 3000번 포트에서 시작');
})
