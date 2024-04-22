const config = require("../config.json");
const {Sequelize} = require("sequelize");


const dataBase = new Sequelize(config.db);

dataBase.authenticate().then(()=>{
    console.log("Database Connected");
    // console.log("Database",dataBase);

}).catch((error)=>{
    console.log("Database Connection.js error", error);

});


module.exports = dataBase;