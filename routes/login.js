var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/User');

/* GET login page. */


module.exports.form = function(req,res){  
  res.sendFile(path.join(__dirname, '..','/views/login.html'));
};

module.exports.submit = function(req,res,next){
  var data = req.body;
  console.log(data.uId);
  User.findOne({where:{uId:data.uId}}).then(user=>{
    console.log(JSON.stringify(user));
    if(user.uPassword === data.uPassword){
      res.redirect('/index');
    }
  });
};
