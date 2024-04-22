const mongoose = require ("mongoose");

const purchase= new mongoose.Schema({
    productName:{
        type:String,
        required:true,
    },
    productId:{
        type:String,
        required:true,
    },
    purchaseRate:{
        type:Number,
       default:0,
       required:true
    },
    quantity:{
        type:Number,
       default:0,
       required:true
    },
    total:{
        type:Number,
       default:0,
       required:true
    }
})

module.exports = new mongoose.model("Purchase",purchase)
