var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jade = require('jade');

// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();
var fs = require('fs');
var multer = require('multer');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', jade.__express);
app.set('view engine', 'html');
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);

app.use(bodyParser.urlencoded({
	// uploadDir: './uploads',
	extended: false
}))
// 设置保存路径
app.use(multer({
	dest: 'public/',
	limits: {
		fileSize: 100000000
	},
	onFileSizeLimit: function(file) {
		if(file.size > 100000000){
			fs.unlink('./' + file.path)
		}
	}
}).array('image'))

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/' + 'views/files.html');
})

// 单文件上传
app.post('/file_upload', function(req, res) {
	console.log(req.files[0])
	var des_file = __dirname + '/public/images/' + req.files[0].originalname;
	fs.readFile( req.files[0].path, function(err, data) {
		fs.writeFile(des_file, data, function(err){
			if(err){
				console.log(err)
			}else{
				response = {
					message: 'file success',
					filename: req.files[0].originalname
				};
			}
			console.log(response);
			res.end(JSON.stringify(response))

		})
	})
})

//多文件上传
app.post('/multiple_file_upload', function(req, res) {
	if(req.files == undefined) {
		req.send("您还未选择要上传的图片");
	}else{
		console.log("length---------------")
		console.log(req.files.length)
		console.log("length---------------")
		for(var i=0; i<req.files.length; i++){
			var file_path = req.files[i].path;
			var des_file = __dirname + '/public/images/' + req.files[i].originalname;
			fs.renameSync(file_path, des_file);
		}
		res.send("上传图片成功")
	}
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
