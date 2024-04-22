const mongoProduct = require("../models/mongoProduct")
var express = require('express');
var router = express.Router();
const { v4: uuidV4 } = require("uuid");
const url = require("url");
const baseUrl = require("../helper")

// /////////////////////////////////////////////////////////////////////////////////////////
// Product
// /////////////////////////////////////////////////////////////////////////////////////////


// List of Products
router.get('/', async function (req, res, next) {
  const product = await mongoProduct.getProduct();
  // const arr = []
  // product.response.map((item) => {
  //   // console.log(item.dataValues)
  //   arr.push(item.dataValues)
  // })
// console.log(baseUrl)
// console.log(product)
// console.log(req.originalUrl)


  res.render('listOfAddProduct',{baseUrl:baseUrl,data:product.response,url:req.originalUrl});
});

// Add Product Form
router.get('/addProduct', function (req, res, next) {
  // console.log(req.originalUrl)

  res.render('addProduct',{url:req.originalUrl,baseUrl:baseUrl});
});


// Create Product
router.post('/addProduct', async function (req, res, next) {
  try {
    console.log("test",req.body)
    const product = await mongoProduct.createProduct(req.body)
    if (product.error) {
      console.log(product.error)
    }
    else {
      res.redirect(baseUrl)
    }
  } catch (error) {
    console.log(error)
    return {
      res: error
    }
  }
});

// update Product Form

router.get('/updateProductForm/:id', async function (req, res, next) {
  const query = req.params.id;
 const product = await mongoProduct.getOneProduct(query);
//  console.log(product)

//  console.log(req.originalUrl)

  res.render('updateProductForm',{data:product.response,baseUrl:baseUrl,url:req.originalUrl});
});



// Update Product

router.post('/updateProductForm/:id', async function (req, res, next) {
  try {
    const query = req.params.id;
    const body = req.body;
    const product = await mongoProduct.updateProduct(query,body);
    if (product.error) {
      console.log(product.error)
    }
    else {
      res.redirect(baseUrl)
    }
  } catch (error) {
    return {
      res: error
    }
  }
});

// delete Product

router.get('/deleteProduct/:id', async function (req, res, next) {
  try {
    // console.log(req.params)
    
    const query = req.params.id;
    // const query = undefined;

    const product = await mongoProduct.deleteProduct(query);
    if (product.error) {
      console.log(product.error)
    }
    else {
      res.redirect(baseUrl)
    }
  } catch (error) {
    return {
      res: error
    }
  }
});
// /////////////////////////////////////////////////////////////////////////////////////////
// Purchase
// /////////////////////////////////////////////////////////////////////////////////////////



// List of Purchase
router.get("/listOfPurchase", async function (req, res, next) {
  const purchase = await mongoProduct.getPurchase();
  // const arr = []
  // product.response.map((item) => {
  //   // console.log(item.dataValues)
  //   arr.push(item.dataValues)
  // })
  // console.log("check",req.originalUrl)
  // console.log(product.response)

  res.render('listOfPurchase',{baseUrl:baseUrl,data:purchase.response});
});


// Add Purchase Form
router.get('/addPurchase', async function (req, res, next) {
  const product = await mongoProduct.getProduct();
// console.log(req.originalUrl)
  res.render('addPurchase',{data:product.response,baseUrl:baseUrl,url:req.originalUrl});
});


// Create Purchase
router.post('/addPurchase', async function (req, res, next) {
  try {
    // console.log(req.body)
    const purchase = await mongoProduct.createPurchase(req.body);
    if (purchase.error) {
      console.log(purchase.error)
    }
    else {
      res.redirect(`${baseUrl}listOfPurchase`)
    }
  } catch (error) {
    return {
      res: error
    }
  }
});

// update Purchase Form

router.get('/updatePurchaseForm/:id', async function (req, res, next) {
  const query = req.params.id;
// console.log("query",query)
   const purchase = await mongoProduct.getOnePurchase(query);
//  console.log("purchase",purchase)

//  console.log(req.originalUrl)

  res.render('updatePurchaseForm',{data:purchase.response,baseUrl:baseUrl,url:req.originalUrl});
});



// Update Purchase

router.post('/updatePurchaseForm/:id', async function (req, res, next) {
  try {
    const query = req.params.id;
    const body = req.body;

    // console.log("body",body)

    const purchase = await mongoProduct.getOnePurchase(query);
    if (purchase.error) {
      console.log(purchase.error)
    }

    const product = await mongoProduct.getOneProductByProductId(purchase.response.productId);
    if (product.error) {
      console.log(product.error)
    }

    // console.log("purchase",purchase.response)
    // console.log("product",product.response)
     
    let quantity = product.response[0].quantity-purchase.response.quantity;

        quantity=  quantity + (+body.quantity)

        // console.log(quantity)
    product.response[0].quantity=quantity;

    // console.log("last Produvt",product)


    const updateProduct = await mongoProduct.updateProduct(product.response[0]._id,product.response[0]);
    if (updateProduct.error) {
      console.log(updateProduct.error)
    }


      const updatePurchase = await mongoProduct.updatePurchase(query,body);
    if (updatePurchase.error) {
      console.log(updatePurchase.error)
    }


      res.redirect(`${baseUrl}listOfPurchase`)
    
  } catch (error) {
    return {
      res: error
    }
  }
});

// delete Purchase

router.get('/deletePurchase/:id', async function (req, res, next) {
  try {
    // console.log(req.params.id)
    const query = req.params.id;

    const purchase = await mongoProduct.getOnePurchase(query);
    if (purchase.error) {
      console.log(purchase.error)
    }

    const product = await mongoProduct.getOneProductByProductId(purchase.response.productId);
    if (product.error) {
      console.log(product.error)
    }

    // console.log("purchase",purchase.response)
    // console.log("product",product.response)
     
    let quantity = product.response[0].quantity-purchase.response.quantity;

        // console.log(quantity)
    product.response[0].quantity=quantity;

    // console.log("last Produvt",product)


    const updateProduct = await mongoProduct.updateProduct(product.response[0]._id,product.response[0]);
    if (updateProduct.error) {
      console.log(updateProduct.error)
    }




    const deletePurchase = await mongoProduct.deletePurchase(query);
    if (deletePurchase.error) {
      console.log(deletePurchase.error)
    }
    else {
      res.redirect(`${baseUrl}listOfPurchase`)
    }
  } catch (error) {
    return {
      res: error
    }
  }
});

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Sale

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// List of Sale
router.get("/listOfSale", async function (req, res, next) {
  const sale = await mongoProduct.getSale();
  // const arr = []
  // product.response.map((item) => {
  //   // console.log(item.dataValues)
  //   arr.push(item.dataValues)
  // })
  // console.log("check",req.originalUrl)
  // console.log(sale.response)

  res.render('listOfSale',{data:sale.response,baseUrl:baseUrl});
});


// Add Sale Form
router.get('/addSale', async function (req, res, next) {
  const product = await mongoProduct.getProduct();
// console.log(req.originalUrl)
  res.render('addSale',{data:product.response,baseUrl:baseUrl,url:req.originalUrl});
});

// Create Sale
router.post('/addSale', async function (req, res, next) {
  try {
    // console.log(req.body)
    const sale = await mongoProduct.createSale(req.body);
    if (sale.error) {
      console.log(sale.error)
    }
    else {
      res.redirect(`${baseUrl}listOfSale`)
    }
  } catch (error) {
    return {
      res: error
    }
  }
});
// update Sale Form

router.get('/updateSaleForm/:id', async function (req, res, next) {
  const query = req.params.id;
// console.log("query",query)

const arr=[];
const product = await mongoProduct.getProduct();

// console.log("product",product.response.productId)

const sale = await mongoProduct.getOneSale(query);
// console.log("sale",sale.response.productId)

product.response.map((item)=>{
  if(sale.response.productId !== item.productId ){
    // console.log("item",item)
    arr.push(item);
  }
})
arr.unshift(sale.response)


// console.log("arr",arr)

 

//  console.log(req.originalUrl)

  res.render('updateSaleForm',{data:sale.response,data1:arr,baseUrl:baseUrl,url:req.originalUrl});
});


// update Sale 

router.post('/updateSaleForm/:id', async function (req, res, next) {
  try {
    const query = req.params.id;
    const body = req.body;

    // console.log("body",body)

    const sale = await mongoProduct.getOneSale(query);
    if (sale.error) {
      console.log(sale.error)
    }


    if ( sale.response.productId === body.productId ){

    const product = await mongoProduct.getOneProductByProductId(sale.response.productId);
    if (product.error) {
      console.log(product.error)
    }

    // console.log("sale",sale.response)
    // console.log("product",product.response)
     
    let quantity = product.response[0].quantity+sale.response.quantity;

    quantity=  quantity - (+body.quantity)

    body.productName = product.response[0].productName;

    body.total= body.quantity * body.rate


        // console.log(quantity)
    product.response[0].quantity=quantity;

    // console.log("last Produvt",product)


    const updateProduct = await mongoProduct.updateProduct(product.response[0]._id,product.response[0]);
    if (updateProduct.error) {
      console.log(updateProduct.error)
    }


      const updateSale = await mongoProduct.updateSale(query,body);
    if (updateSale.error) {
      console.log(updateSale.error)
    }
  }


   else{      // ELSE condition

    const product = await mongoProduct.getOneProductByProductId(sale.response.productId);
    if (product.error) {
      console.log(product.error)
    }

    let quantity =product.response[0].quantity + sale.response.quantity;

    product.response[0].quantity= quantity;

    
    const updateProduct = await mongoProduct.updateProduct(product.response[0]._id,product.response[0]);
    if (updateProduct.error) {
      console.log(updateProduct.error)
    }

    const getproduct = await mongoProduct.getOneProductByProductId(body.productId);
    if (product.error) {
      console.log(product.error)
    }


    let getQuantity = getproduct.response[0].quantity - body.quantity;

    getproduct.response[0].quantity= getQuantity;

    const getUpdateProduct = await mongoProduct.updateProduct(getproduct.response[0]._id,getproduct.response[0]);
    if (getUpdateProduct.error) {
      console.log(getUpdateProduct.error)
    }

    body.total= body.quantity * body.rate
     body.productName=getproduct.response[0].productName;


     const getUpdateSale = await mongoProduct.updateSale(query,body);
     if (getUpdateSale.error) {
       console.log(getUpdateSale.error)
     }
   }

      res.redirect(`${baseUrl}listOfSale`)
    
  } catch (error) {
    return {
      res: error
    }
  }
});


// delete Sale

router.get('/deleteSale/:id', async function (req, res, next) {
  try {
    // console.log(req.params.id)
    const query = req.params.id;

    const sale = await mongoProduct.getOneSale(query);
    if (sale.error) {
      console.log(sale.error)
    }

    const product = await mongoProduct.getOneProductByProductId(sale.response.productId);
    if (product.error) {
      console.log(product.error)
    }

    // console.log("sale",sale.response)
    // console.log("product",product.response)
     
    let quantity = product.response[0].quantity+sale.response.quantity;

        // console.log(quantity)
    product.response[0].quantity=quantity;

    // console.log("last Produvt",product)


    const updateProduct = await mongoProduct.updateProduct(product.response[0]._id,product.response[0]);
    if (updateProduct.error) {
      console.log(updateProduct.error)
    }




    const deleteSale = await mongoProduct.deleteSale(query);
    if (deleteSale.error) {
      console.log(deleteSale.error)
    }
    else {
      res.redirect(`${baseUrl}listOfSale`)
    }
  } catch (error) {
    return {
      res: error
    }
  }
});

module.exports = router