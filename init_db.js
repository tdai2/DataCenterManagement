/*
const model = require('./model');
model.sync();
*/

const Sequelize = require('sequelize');

const config = require('./config_test');

var sequelize = new Sequelize(config.database,config.username,config.password,{
    host:config.host,
    dialect: 'mysql',
    pool :{
        max :5,
        min :0,
        idle: 10000
    }
});

sequelize.sync().then(
    console.log('init db ok.')
).catch(
     console.log(Error)
);

//console.log('init db ok.');
process.exit(0);