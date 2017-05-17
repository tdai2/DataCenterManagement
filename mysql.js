var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '.')));

const Sequelize = require("sequelize");
const config = require('./config');

var sequelize = new Sequelize(config.database,config.username,config.password,{
  host: config.host,
  dialect: 'mysql',
  pool :{
    max:5,
    min:0,
    idle:30000
  }
});

var User = sequelize.define(
  'user',
   {
     id : {
       field : 'id',
       type: Sequelize.STRING(20),
       primaryKey : true
     },
     uname:{
       field : 'userName',
       type: Sequelize.STRING(20),
       allowNull: false
     },
     upassword:{
       field : "userPassword",
       type : Sequelize.STRING(20),
       allowNull: false
     },
     uId:{
       field : "userID",
       type : Sequelize.STRING(20),
       allowNull: false
     },
     uPrivilege:{
       field : "userPrivilege",
       type: Sequelize.STRING(20),
       allowNull:false
     }
   },
   {
       timestamps : false

   }
);
sequelize.sync().then(function(){
  User.create({
   id : "20",
   uname : 'Tony',
   upassword : 'superuser',
   uPrivilege : 'superuser',
   uId : '11341084'
  });
});



app.use('/', function(req,res){
  res.sendFile(__dirname+'/views/login.html');
  });
//app.use('/users', users);

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
