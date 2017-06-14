const Sequelize = require('sequelize');
const config = require('./config_test');
const uuid = require('node-uuid');

var sequelize = new Sequelize(config.database,config.username,config.password,{
    host:config.host,
    dialect: 'mysql',
    pool :{
        max :5,
        min :0,
        idle: 10000
    }
});

function generateId() {
    return uuid.v4();
}

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name,attributes){
    var attrs = {};
    for (let k in attributes){
        let value = attributes[k];
        if (typeof value === 'object' && value['type']){
            value.allowNull = value.allowNull||false;
            attrs[k] = value;
        }
        else{
            attrs[k] = {
                type :value,
                allowNull:false
            }
        }
    }
    attrs.id = {
        type:ID_TYPE,
        primaryKey : true
    };
    attrs.createdAt = {
        type:Sequelize.BIGINT,
        allowNull: false
    }
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
     
 return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                } else {
                    obj.updatedAt = Date.now();
                    obj.version++;
                }
            }
        }
    });
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];
var exp = {
    defineModel: defineModel,
    sync: () => {
        // only allow create ddl in non-production environment:
        if (process.env.NODE_ENV !== 'production') {
            sequelize.sync({ force: true });
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    }
};

for (let type of TYPES) {
    exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;



/*
module.exports = {
    STRING:Sequelize.STRING,
    INTEGER: Sequelize.INTEGER,
    defineModel: defineModel
};
*/