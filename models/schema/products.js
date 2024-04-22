const {Model,DataTypes} = require("sequelize");
const sequelize =require("../../dataBase/dbConnection")
class Products extends Model{}

Products.init({
    productId:{
        primaryKey:true,
        type:DataTypes.STRING(60),      
        allowNull:false,  
    },
    productName:{
        type:DataTypes.STRING(60),
        allowNull:false,
    },
    quantity:{
        type:DataTypes.INTEGER(),
        defaultValue:0,
        allowNull:false
    }
},{
    sequelize,
    timestamps:true,
    paranoid:true,
    modelName:"products"
});

module.exports= Products;