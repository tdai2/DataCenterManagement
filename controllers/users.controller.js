'use strict';

/**
 * Module dependencies.
 */
var userModel = require('../models/User');

/**
 * List of users
 */

/*
exports.list = function(req, res) {
  userModel.find(function(err, users) {
    if (err) {
      return res.status(400).send({
        message: 'something error'
      });
    } else {
      res.json(users);
    }
  });
};
*/

exports.list = function(req, res) {
//  var test = userModel.findOne({where:{uId:"11341084"}})
  var test = userModel.findOne({where:{id:"58c9c746-f768-42fe-a95e-686edf1051c6"}}).then(user=>{
  console.log(user);
  });
  userModel.findAll().then(userList => {
      res.json(userList);
  });
};

exports.findById = function(req,res){
  userModel.findOne({where:{id:req.params.id}}).then(user =>{ 
      res.json(user);
  });
};
  /*
  userModel.find(function(err, users) {
    if (err) {
      return res.status(400).send({
        message: 'something error'
      });
    } else {
      res.json(users);
    }
  });
  */
