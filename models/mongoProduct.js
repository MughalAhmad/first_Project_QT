const { NUMBER } = require("sequelize");
const Product = require("./mongoSchema/products");
const Purchase = require("./mongoSchema/purchase");
const Sale= require("./mongoSchema/sales")

module.exports = {
  createProduct: async (body) =>{
    try {
        // console.log("hello",body)
      const product = await Product.create({
        ...body
      });
      return {
        response: product
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },
  getProduct: async () =>{
    try {
      const product = await Product.find();
      return {
        response: product
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },
  getOneProduct: async (query) =>{
    try {
      const product = await Product.findById(query);
      return {
        response: product
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },
  getOneProductByProductId: async (query) =>{
    try {
      const product = await Product.find({productId:query});
      return {
        response: product
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },
  updateProduct: async (query,body) =>{
    try {
      const product = await Product.findByIdAndUpdate(query,body,{new:true,
      useFindAndModify:true,runValidator:true});
      return {
        response: product
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },
  deleteProduct: async (query) =>{
    try {
      const product = await Product.deleteOne({ _id: query});
      return {
        response: product
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },


  // Purchase



  createPurchase: async (body) =>{
    try {
        // console.log("body",body)

        const product = await Product.find({productId:body.productId});
console.log("product",product)
const arr={};
product.map((item)=>{
  // console.log("product.quantity",typeof(item.quantity))
  // console.log("body.quantity",typeof(+body.quantity))
  let quantity = item.quantity + (+body.quantity);
  let total = body.quantity * body.purchaseRate;
  body.total= total;
  body.productId= item.productId;
  // item.quantity=quantity;
  let productName= item.productName;
  // console.log(productName)
  body.productName=productName;
  // console.log(quantity)
  // console.log(body)
  arr._id=item._id;
  arr.productId=item.productId;
  arr.productName=item.productName;
  arr.quantity=quantity
})
// console.log("last ",product)
// console.log("arr ",arr)


const updateProduct = await Product.findByIdAndUpdate(arr._id,arr,{new:true,
  useFindAndModify:true,runValidator:true});

// console.log("updateProduct",updateProduct)
      const purchase = await Purchase.create({
        ...body
      });
      return {
        response: purchase
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },
  getPurchase: async () =>{
    try {
      const purchase = await Purchase.find();
      return {
        response: purchase
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },
  getOnePurchase: async (query) =>{
    try {
      const purchase = await Purchase.findById(query);
      return {
        response: purchase
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },
  updatePurchase: async (query,body) =>{
    try { 
      const purchase = await Purchase.findByIdAndUpdate(query,body,{new:true,
      useFindAndModify:true,runValidator:true});
      return {
        response: purchase
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },
  deletePurchase: async (query) =>{
    try {
      const purchase = await Purchase.deleteOne({_id:query});
      return {
        response: purchase
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },





    // Sale



  createSale: async (body) =>{
    try {
        // console.log("body",body)

        const product = await Product.find({productId:body.productId});
// console.log("product",product)
const arr={};
product.map((item)=>{
  // console.log("product.quantity",typeof(item.quantity))
  // console.log("body.quantity",typeof(+body.quantity))
  let quantity = item.quantity - (+body.quantity);
  let total = body.quantity * body.rate;
  body.total= total;
  // item.quantity=quantity;
  let productName= item.productName;
  // console.log(productName)
  body.productName=productName;
  // console.log(quantity)
  // console.log(body)
  arr._id=item._id;
  arr.productId=item.productId;
  arr.productName=item.productName;
  arr.quantity=quantity
})
// console.log("last ",product)
// console.log("arr ",arr)


const updateProduct = await Product.findByIdAndUpdate(arr._id,arr,{new:true,
  useFindAndModify:true,runValidator:true});

// console.log("updateProduct",updateProduct)
      const sale = await Sale.create({
        ...body
      });
      return {
        response: sale
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },



  getSale: async () =>{
    try {
      const sale = await Sale.find();
      return {
        response: sale
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },
  getOneSale: async (query) =>{
    try {
      const sale = await Sale.findById(query);
      return {
        response: sale
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },
  updateSale: async (query,body) =>{
    try { 
      console.log(body)
      const sale = await Sale.findByIdAndUpdate(query,body,{new:true,
      useFindAndModify:true,runValidator:true});
      return {
        response: sale
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },
  deleteSale: async (query) =>{
    try {
      const sale = await Sale.deleteOne({_id:query});
      return {
        response: sale
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },

}