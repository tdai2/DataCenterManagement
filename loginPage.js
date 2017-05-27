var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var index = require('./routes/index');
//var users = require('./routes/users');
var login = require('./routes/login');
var credentials = require('./credentials');

var app = express();
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(credentials.cookieSecret));
app.use(express.static(path.join(__dirname, '.')));
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser())

//app.all('*',login.requireAuthentication);

app.get('/login',login.form);
app.post('/login', login.submit )


app.get('/welcome',function(req,res){
  console.log(req.cookies);
  var fileName= path.join(__dirname,'/public/index.html');
  res.sendFile(fileName);
  //res.render('welcome',{title:req.cookies.userName});
});

app.use('/reject',function(req,res){
  res.render('reject',{title:req.cookies.userName})
});

//app.use('/',login);


/*
app.get('/login',login.form);
app.post('/login', login.submit )

router.post('/login', function(req,res){
  res.sendFile(__dirname+'/views/login.html');
});
app.all('*', users.requireAuthentication);
app.use('/', users);




app.get('/welcome',function(req,res){
  res.render('welcome',{title:Tony});
});


app.use('/reject',function(req,res){
  res.render('reject',{title:Tony})
});

*/
const model = require('./model');
let User = model.User;

console.log("modle import complete");
/*
(async () => {
    var user = await User.create({
      uname : 'Tony',
      upassword : 'superuser',
      uPrivilege : 'superuser',
      uId : '11341084'
    });
    console.log('created: ' + JSON.stringify(user));
    console.log(user.uname);
})();

*/
//console.log(user.uname);

/*
app.use('/', function(req,res){
  res.sendFile(__dirname+'/views/login.html');
  });
//app.use('/users', users);
*/
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
