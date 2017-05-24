var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var express_session = require("express-session");


var User = require('./models/User');

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
app.use(express_session({secret: 'blog.fens.me', cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '.')));
app.use(express.static(path.join(__dirname,'pubilc')))
app.use(bodyParser())

//app.all('*',login.requireAuthentication);

passport.use('local',new LocalStrategy(
  function(uId,upassword,done){
    var user = {
            id: '1',
            username: 'admin',
            password: 'pass'
        }; // 可以配置通过数据库方式读取登陆账号
    return done(null,user);

    if(uId!=='11341084'){
      console.log("uId is"+uId);
      return done(null,user);
      //return done(null,false,{message:"Incorrect username."});
      
    }
    if(upassword!=='superuser'){
      console.log("upassword is"+upassword);
      return done(null,false,{message:"Incorrect password."});
    }
    return done(null,user);
  }
));

passport.serializeUser(function (user, done) {//保存user对象
    done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
    done(null, user);//可以通过数据库方式操作
});



app.get('/',login.form);
app.post('/login', passport.authenticate('local',{
  failureRedirect:'/reject',
  successRedirect:'/welcome'
  }));



app.get('/welcome',function(req,res){
  console.log(req.cookies);
  res.render('welcome',{title:req.session.userName});
});

app.get('/reject',function(req,res){
  res.render('reject',{title:req.session.userName})
});

app.all('*', isLoggedIn);
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();}
    res.redirect('/login');
}

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
