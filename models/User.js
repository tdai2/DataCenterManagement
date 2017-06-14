const db = require('../db');
module.exports = db.defineModel(
    'users',{
    uname:{
        type: db.STRING(100),
        allowNull: false,
        field: "userName"
    },
    upassword:{
       field : "userPassword",
       type : db.STRING(20),
       allowNull: false
     },
     uId:{
       field : "userID",
       type : db.STRING(20),
       allowNull: false
     },
     uPrivilege:{
       field : "userPrivilege",
       type: db.STRING(20),
       allowNull:false
     }
    });

/*
var users = [
  {
    name: 'Person1',
    age: 1
  },{
    name: 'Person1',
    age: 2
  },{
    name: 'Person3',
    age: 3
  },{
    name: 'Person4',
    age: 4
  },{
    name: 'Person5',
    age: 5
  }
]
module.exports = {
  find: function(callback){
    callback(null,users);
  }
};
*/