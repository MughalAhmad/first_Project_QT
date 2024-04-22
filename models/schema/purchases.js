const {Model,DataTypes} = require("sequelize");
const sequelize =require("../../dataBase/dbConnection")
class Purchases extends Model{}

Purchases.init({
    purchaseId:{
        primaryKey:true,
        type:DataTypes.STRING(60),
        allowNull:false,
    },
    purchaseRate:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    quantity:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    total:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
},{
    sequelize,
    timestamps:true,
    paranoid:true,
    modelName:"purchases"
});

module.exports= Purchases;