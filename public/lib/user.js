var Sequelize = require('sequelize');
var config = require('./config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});


var User = sequelize.define('user',{
   id:{
    type: Sequelize.STRING(100),   
     primaryKey: true
   },
   uName:Sequelize.STRING(100),
   uID:Sequelize.STRING(20),
   uPassword:Sequelize.STRING(30),
   uPrivilege:Sequelize.STRING(20)
},{
    timestamps:false
});

