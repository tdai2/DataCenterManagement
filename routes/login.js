var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/User');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


/* GET login page. */



module.exports.requireAuthentication = function(req,res,next){
  if(req.path == '/login'){
    next();
    return;
  }
  if(req.session!=undefined){
    if(req.session.userName!=undefined){
      next();
      return;
  }
  }  
  res.redirect('/login');
  
};

module.exports.form = function(req,res){  
  res.sendFile(path.join(__dirname,'../views/login.html'));
};



module.exports.submit = function(req,res,next){
  var data = req.body;
  console.log(data.uId);
  User.findOne({where:{uId:data.uId}}).then(user=>{
    console.log(JSON.stringify(user));
    if(user.upassword == data.upassword){
      //res.cookie('userName', user.uname);
      req.session.userName = user.uname;
      console.log('Loing in successfully');
      
      res.redirect('/welcome');
      
    }
    else{
      res.redirect('/reject');
      console.log('Loing in failed');
    }
  });
};
