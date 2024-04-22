const { Query } = require("pg");
const { models } = require("./relations");
const Products = require("./schema/products");
const {sequelize} = require("sequelize");

module.exports = {
  createProduct: async (body) => {
    try {
      const product = await models.Products.create({
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
  getProduct: async () => {
    try {
      const product = await models.Products.findAll();
      return {
        response: product
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },
  deleteProduct: async (query) => {
    try {
      const product = await models.Products.destroy({
        where: {
          productId: query
        }
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
  getOneProduct: async (query) => {
    try {
      const product = await models.Products.findOne({
        where: {
          productId: query
        }
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
  updateProduct: async (query, body) => {
    try {
      const product = await models.Products.update({ ...body, }, {
        where: {
          productId: query
        }
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

  // Reaction

  createReaction: async (body) => {
    try {
      const reaction = await models.Reaction.create({
        ...body
      });
      return {
        response: reaction
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },

  // all Data

  getAll: async () => {
    try {
      const product = await models.Products.findAll({
        include: {
          model: models.Reaction
        }
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

  // Purchase

  createPurchase: async (body,purchaseId) => {
    try {
      // console.log("create ",body)
      const purchase = await models.Purchases.create({
        purchaseId,
        ...body,
      });

      const product = await models.Products.findOne({
        where:{
productId:body.productId
        }
      });
      // console.log(product.dataValues.quantity+purchase.dataValues.quantity)
      const quantity =  product.dataValues.quantity+purchase.dataValues.quantity
const productUpdate = await models.Products.update({ quantity:quantity }, {
  where: {
    productId: body.productId
  }
})
// console.log(productUpdate)

      return {
        response: purchase
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },






  getPurchase: async () => {
    try {
      const purchase = await models.Purchases.findAll({
        include: {
          model: models.Products
        }
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
  getOnePurchase: async (query) => {
    try {
      const purchase = await models.Purchases.findOne({
        include: {
          model: models.Products
        },
        where: {
          purchaseId: query
        }
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
  updatePurchase: async (query, body) => {
    try {
      // console.log("update",query,body)
      const purchase = await models.Purchases.update({ ...body }, {
        where: {
          purchaseId: query
        }
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
  updatePurchaseQuantity: async (query,body) => {
    try {
// console.log("body",body)

      const purchase = await models.Purchases.findOne({
        where: {
          purchaseId: query
        }
      });
// console.log("purchase",purchase)

const product = await models.Products.findOne({
  where:{
productId:body.productId
  }
});
// console.log("test-product-quantity",product.dataValues.quantity)
// console.log("test-purchase-quantity",purchase.dataValues.quantity)



      // console.log("test",product.dataValues.quantity-purchase.dataValues.quantity)
      const quantity =  product.dataValues.quantity-purchase.dataValues.quantity
const productUpdate = await models.Products.update({ quantity:quantity }, {
  where: {
    productId: body.productId
  }
})
const productAgain = await models.Products.findOne({
  where:{
productId:body.productId
  }
});
let updateQuantity = parseInt(productAgain.dataValues.quantity) + parseInt(body.quantity) ;

// console.log("test -updateQuantity",updateQuantity)

const setQuantity = await models.Products.update({ quantity:updateQuantity }, {
  where: {
    productId: body.productId
  }
})


// console.log("productUpdate",productUpdate)

if(productUpdate.error){
  console.log(productUpdate.error)
}
      return {
        response: setQuantity
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },
  deletePurchase: async (query) => {
    try {
      const purchase = await models.Purchases.destroy({
        where: {
          purchaseId: query
        }
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

  deletePurchaseQuantity: async (query) => {
    try {
// console.log("query",query)

      const purchase = await models.Purchases.findOne({
        where: {
          purchaseId: query
        }
      });
// console.log("purchase",purchase)

const product = await models.Products.findOne({
  where:{
productId:purchase.dataValues.productId
  }
});
// console.log("test-product-quantity",product.dataValues.quantity)
// console.log("test-purchase-quantity",purchase.dataValues.quantity)



      // console.log("test",product.dataValues.quantity-purchase.dataValues.quantity)
      const quantity =  product.dataValues.quantity-purchase.dataValues.quantity
const productUpdate = await models.Products.update({ quantity:quantity }, {
  where: {
    productId: purchase.dataValues.productId
  }
})

// console.log("productUpdate",productUpdate)

if(productUpdate.error){
  console.log(productUpdate.error)
}
      return {
        response: productUpdate
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },

   // Sale

   createSale: async (body,saleId) => {
    try {
      const sale = await models.Sales.create({
        saleId,
        ...body,
      });

      const product = await models.Products.findOne({
        where:{
productId:body.productId
        }
      });
      // console.log(product.dataValues.quantity-sale.dataValues.quantity)
      const quantity =  product.dataValues.quantity-sale.dataValues.quantity
const productUpdate = await models.Products.update({ quantity:quantity }, {
  where: {
    productId: body.productId
  }
})
// console.log(productUpdate)
      return {
        response: sale
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },

  getSale: async () => {
    try {
      const sale = await models.Sales.findAll({
        include: {
          model: models.Products
        }
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
  getOneSale: async (query) => {
    try {
      const sale = await models.Sales.findOne({
        include: {
          model: models.Products
        },
        where: {
          saleId: query
        }
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
  updateSale: async (query, body) => {
    try {
      const sale = await models.Sales.update({ ...body }, {
        where: {
          saleId: query
        }
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
  deleteSale: async (query) => {
    try {
      const sale = await models.Sales.destroy({
        where: {
          saleId: query
        }
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
  updateSaleQuantity: async (query,body) => {
    try {
// console.log("body",body)

      const sale = await models.Sales.findOne({
        where: {
          saleId: query
        }
      });
// console.log("sale",sale)

const product = await models.Products.findOne({
  where:{
productId:body.productId
  }
});
// console.log("test-product-quantity",product.dataValues.quantity)
// console.log("test-purchase-quantity",sale.dataValues.quantity)



      // console.log("test",product.dataValues.quantity+sale.dataValues.quantity)
      const quantity =  product.dataValues.quantity+sale.dataValues.quantity
const productUpdate = await models.Products.update({ quantity:quantity }, {
  where: {
    productId: body.productId
  }
})
const productAgain = await models.Products.findOne({
  where:{
productId:body.productId
  }
});
let updateQuantity = parseInt(productAgain.dataValues.quantity) - parseInt(body.quantity) ;

// console.log("test -updateQuantity",updateQuantity)

const setQuantity = await models.Products.update({ quantity:updateQuantity }, {
  where: {
    productId: body.productId
  }
})


// console.log("productUpdate",productUpdate)

if(productUpdate.error){
  console.log(productUpdate.error)
}
      return {
        response: setQuantity
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },
  deleteSaleQuantity: async (query) => {
    try {
// console.log("query",query)

      const sale = await models.Sales.findOne({
        where: {
          saleId: query
        }
      });
// console.log("sale",sale)

const product = await models.Products.findOne({
  where:{
productId:sale.dataValues.productId
  }
});
// console.log("test-product-quantity",product.dataValues.quantity)
// console.log("test-sale-quantity",sale.dataValues.quantity)



      // console.log("test",product.dataValues.quantity+sale.dataValues.quantity)
      const quantity =  product.dataValues.quantity+sale.dataValues.quantity
const productUpdate = await models.Products.update({ quantity:quantity }, {
  where: {
    productId: sale.dataValues.productId
  }
})

console.log("productUpdate",productUpdate)

if(productUpdate.error){
  console.log(productUpdate.error)
}
      return {
        response: productUpdate
      };
    } catch (error) {
      return {
        error: error
      }
    }
  },
};