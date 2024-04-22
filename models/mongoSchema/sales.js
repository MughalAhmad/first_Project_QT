const mongoose = require ("mongoose");

const sale= new mongoose.Schema({
    buyerName:{
        type:String,
        required:true,
    },
    productName:{
        type:String,
        required:true,
    },
    productId:{
        type:String,
        required:true,
    },
    rate:{
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

module.exports = new mongoose.model("Sale",sale)
