const {Model,DataTypes} = require("sequelize");
const sequelize =require("../../dataBase/dbConnection")
class Sales extends Model{}

Sales.init({
    saleId:{
        primaryKey:true,
        type:DataTypes.STRING(60),
        allowNull:false,
    }, 
    buyerName:{
        type:DataTypes.STRING(60),
        allowNull:false,
    },
    rate:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    quantity:{
        type:DataTypes.INTEGER,
    },
    total:{
        type:DataTypes.INTEGER,
        allowNull:false,

    }
},{
    sequelize,
    timestamps:true,
    paranoid:true,
    modelName:"sales"
});

module.exports= Sales;