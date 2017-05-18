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