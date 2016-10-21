var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require("moment");
var routes = require('./routes/index');
var users = require('./routes/users');
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var mongoose = require("mongoose");
var flash = require("connect-flash");


mongoose.connect("mongodb://localhost:27017/datas");
mongoose.connection.on("error",console.error.bind(console,"连接数据库失败！"));

var app = express();

// 设置session参数
app.use(session({
  key:"session",
  secret:"xiaowanzi",
  cookie:{maxAge:1000*60*60*24},
  store:new MongoStore({
    db:"datas",
    mongooseConnection:mongoose.connection
  }),
  resave:false,
  saveUninitialized:true
}));

// 使用flash
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// 建立数据库模型对象

app.listen(3000);

module.exports = app;
