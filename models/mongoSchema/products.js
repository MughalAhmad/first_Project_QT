const mongoose = require ("mongoose");

const product= new mongoose.Schema({
    productId:{
        primaryKey:true,
        type:String,
        required:true,
        unique:true
    },
    productName:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
       default:0,
       required:true
    }
})

module.exports = new mongoose.model("Product",product)
