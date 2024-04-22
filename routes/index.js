const productModel = require("../models/productModel")
var express = require('express');
var router = express.Router();
const { v4: uuidV4 } = require("uuid");
const dataBase = require("../dataBase/dbConnection");


// Product Reaction Form
router.get('/reactionForm', async function (req, res, next) {
  const product = await productModel.getProduct();
  const arr = []
  product.response.map((item) => {
    // console.log(item.dataValues)
    arr.push(item.dataValues)
  })
  res.render('reaction', { data: arr });
});


// Create Reaction
router.post('/reaction', async function (req, res, next) {
  try {
    // console.log(req.body)
    const reaction = await productModel.createReaction(req.body);
    if (reaction.error) {
      // console.log(reaction.error)
    }
    else {
      res.redirect("/")
    }
  } catch (error) {
    return {
      res: error
    }
  }
});


// all data Form
router.get('/allDataForm', async function (req, res, next) {
  const all = await productModel.getAll();
  // console.log(all.response)
  const arr = []
  all.response.map((item) => {
    const Data={
      productId:item.dataValues.productId,
      productName:item.dataValues.productName,
      productPurchase:item.dataValues.productPurchase,
      productSales:item.dataValues.productSales,
      type:item.reaction.type,
      id:item.reaction.id,
    }
    arr.push(Data)
  })
  // console.log(arr)

  res.render('allData', { data: arr });

});


// /////////////////////////////////////////////////////////////////////////////////////////
// Product
// /////////////////////////////////////////////////////////////////////////////////////////


// List of Products
router.get('/', async function (req, res, next) {
  const product = await productModel.getProduct();
  const arr = []
  product.response.map((item) => {
    // console.log(item.dataValues)
    arr.push(item.dataValues)
  })
  res.render('listOfAddProduct', { data: arr });
});


// Add Product Form
router.get('/addProduct', function (req, res, next) {
  res.render('addProduct');
});


// Create Product
router.post('/createProduct', async function (req, res, next) {
  try {
    // console.log(req.body)
    const product = await productModel.createProduct(req.body);
    if (product.error) {
      console.log(product.error)
    }
    else {
      res.redirect("/")
    }
  } catch (error) {
    return {
      res: error
    }
  }
});


// Delete Product

router.get('/deleteProduct/:productId', async function (req, res, next) {
  try {
    // console.log(req.params.productId)
    
    const query = req.params.productId;
    const product = await productModel.deleteProduct(query);
    if (product.error) {
      console.log(product.error)
    }
    else {
      res.redirect("/")
    }
  } catch (error) {
    return {
      res: error
    }
  }
});



// update Product Form

router.get('/updateProductForm/:productId', async function (req, res, next) {
  const query = req.params.productId;
 const product = await productModel.getOneProduct(query);
//  console.log(product)
  res.render('updateProductForm',{data:product.response});
});



// Update Product

router.post('/UpdateProduct/:productId', async function (req, res, next) {
  try {
    const query = req.params.productId;
    const body = req.body;
    const product = await productModel.updateProduct(query,body);
    if (product.error) {
      console.log(product.error)
    }
    else {
      res.redirect("/")
    }
  } catch (error) {
    return {
      res: error
    }
  }
});

// delete Product

router.get('/deleteProduct/:productId', async function (req, res, next) {
  try {
    // console.log(req.params.productId)
    
    const query = req.params.productId;
    const product = await productModel.deleteProduct(query);
    if (product.error) {
      console.log(product.error)
    }
    else {
      res.redirect("/")
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
router.get('/listOfPurchase', async function (req, res, next) {
  const purchase = await productModel.getPurchase();
  const arr = []
  // console.log("purchase",purchase)
  purchase.response.map((item) => {
  // console.log("itemmmmmss",item)
    const Data={
      purchaseId:item.dataValues.purchaseId,
      productId:item.dataValues.productId,
      purchaseRate:item.dataValues.purchaseRate,
      saleRate:item.dataValues.saleRate,
      quantity:item.dataValues.quantity,
      total:item.dataValues.total,
      productName:item.product.productName,
    }
    arr.push(Data)
  })
  res.render('listOfPurchase', { data: arr });
  // res.render('listOfPurchase');

});  

// Add Purchase Form
router.get('/addPurchase', async function (req, res, next) {
  const product = await productModel.getProduct();
  const arr = []
  product.response.map((item) => {
    // console.log(item.dataValues)
    arr.push(item.dataValues)
  })
  res.render('addPurchase', { data: arr });
});


// Create Purchase
router.post('/createPurchase', async function (req, res, next) {
  try {
    // console.log("req.body===>1",req.body)
    const purchaseId= uuidV4();
    const body = req.body;
    // const qty = parseInt(body.quantity)
    // console.log("qty===>2",qty)

    let  total = parseInt(body.quantity)*parseInt(body.purchaseRate);
    body.total= total;
    // console.log("req.body===>2",body)
    const purchase = await productModel.createPurchase(body,purchaseId);
    if (purchase.error) {
      console.log(purchase.error)
    }
    else {
      res.redirect("/listOfPurchase")
    }
  } catch (error) {
    return {
      res: error
    }
  }
});


// update Purchase Form

router.get('/updatePurchaseForm/:purchaseId', async function (req, res, next) {
  const query = req.params.purchaseId;
 const purchase = await productModel.getOnePurchase(query);
 const Data={
  purchaseId:purchase.response.dataValues.purchaseId,
  productId:purchase.response.dataValues.productId,
  purchaseRate:purchase.response.dataValues.purchaseRate,
  saleRate:purchase.response.dataValues.saleRate,
  quantity:purchase.response.dataValues.quantity,
  productName:purchase.response.product.productName,
 }
  res.render('updatePurchaseForm',{data:Data});
});

// Update Purchase
router.post('/UpdatePurchase/:purchaseId', async function (req, res, next) {
  try {
    const query = req.params.purchaseId;
    const body = req.body;
    // console.log("index body ",body)
const checkQuantity= await productModel.updatePurchaseQuantity(query,body)
if(checkQuantity.error){
console.log(checkQuantity.error)
}
// console.log("checkQuantity",checkQuantity)
    let total = body.quantity * body.purchaseRate;
    body.total = total;

    const purchase = await productModel.updatePurchase(query,body);
    if (purchase.error) {
      console.log(purchase.error)
    }
    else {
      res.redirect("/listOfPurchase")
    }
  } catch (error) {
    return {
      res: error
    }
  }
});


// Delete Purchase

router.get('/deletePurchase/:purchaseId', async function (req, res, next) {
  try {
    // console.log(req.params.productId)
    
    const query = req.params.purchaseId;

    const checkDeleteQuantity = await productModel.deletePurchaseQuantity(query)
if(checkDeleteQuantity.error){
  console.log(checkDeleteQuantity.error)
  }
    const purchase = await productModel.deletePurchase(query);
    if (purchase.error) {
      console.log(purchase.error)
    }
    else {
      res.redirect("/listOfPurchase")
    }
  } catch (error) {
    return {
      res: error
    }
  }
});




// /////////////////////////////////////////////////////////////////////////////////////////
// Sales
// /////////////////////////////////////////////////////////////////////////////////////////


// List of Purchase
router.get('/listOfSale', async function (req, res, next) {
  const sale = await productModel.getSale();
  const arr = []
  // console.log("sale",sale)
  sale.response.map((item) => {
  // console.log("itemmmmmss",item)
    const Data={
      saleId:item.dataValues.saleId,
      productId:item.dataValues.productId,
      buyerName:item.dataValues.buyerName,
      rate:item.dataValues.rate,
      quantity:item.dataValues.quantity,
      total:item.dataValues.total,
      productName:item.product.productName,

    }
    arr.push(Data)
    // console.log(Data)
  })
  res.render('listOfSale', { data: arr });
  // res.render('listOfSale');

});  

// Add Sale Form
router.get('/addSale', async function (req, res, next) {
  const product = await productModel.getProduct();
  const arr = []
  product.response.map((item) => {
    // console.log(item.dataValues)
    arr.push(item.dataValues)
  })
  // console.log(arr)
  res.render('addSale', { data: arr });

});

// Create Sale
router.post('/createSale', async function (req, res, next) {
  try {
    // console.log("req.body===>1",req.body)
    const saleId= uuidV4();
    const body = req.body;


 

    let  total = parseInt(body.quantity)*parseInt(body.rate);
    body.total= total;
    // console.log("req.body===>2",body)
    const sale = await productModel.createSale(body,saleId);
    if (sale.error) {
      console.log(sale.error)
    }
    else {
      res.redirect("/listOfSale")
    }
  } catch (error) {
    return {
      res: error
    }
  }
});

// update Sale Form

router.get('/updateSaleForm/:saleId', async function (req, res, next) {
  const query = req.params.saleId;
 const sale = await productModel.getOneSale(query);

 const Data={
  saleId:sale.response.dataValues.saleId,
  productId:sale.response.dataValues.productId,
  buyerName:sale.response.dataValues.buyerName,
  rate:sale.response.dataValues.rate,
  quantity:sale.response.dataValues.quantity,
  productName:sale.response.product.productName,
  
 }
//  console.log("updateSaleForm",Data)
  // res.render('updateSaleForm');
  res.render('updateSaleForm',{data:Data});

});


 // Update Sale
router.post('/UpdateSale/:saleId', async function (req, res, next) {
  try {
    const query = req.params.saleId;
    const body = req.body;

    const checkQuantity= await productModel.updateSaleQuantity(query,body)
    if(checkQuantity.error){
    console.log(checkQuantity.error)
    }

    let total = body.quantity * body.rate;
    body.total = total;
    const sale = await productModel.updateSale(query,body);
    if (sale.error) {
      console.log(sale.error)
    }
    else {
      res.redirect("/listOfSale")
    }
  } catch (error) {
    return {
      res: error
    }
  }
});


// Delete Sale

router.get('/deleteSale/:saleId', async function (req, res, next) {
  try {
    // console.log(req.params.saleId)
    
    const query = req.params.saleId;

const checkDeleteQuantity = await productModel.deleteSaleQuantity(query)
if(checkDeleteQuantity.error){
  console.log(checkDeleteQuantity.error)
  }
    const sale = await productModel.deleteSale(query);
    if (sale.error) {
      console.log(sale.error)
    }
    else {
      res.redirect("/listOfSale")
    }
  } catch (error) {
    return {
      res: error
    }
  }
});



module.exports = router;
