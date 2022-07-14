const Products = require("../models/Products.model");

exports.addProduct = (req, res) => {
  try {
    
    const { title, price, description, quantity } = req.body;
    const products = Products({ title, price, description, quantity });
    products.save((err, product) => {
      if (err) return res.status(400).json(err);
      return res.status(201).json({
        message: "Product Added",
        product,
      });
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};
exports.getAllProduct = async (req, res) => {
  try {
    const products = await Products.find()
    if(products){
        return res.status(200).json(products)
    }else{
        return res.status(404).json({
            message : 'Products Not Found'
        })
    }
    
  } catch (err) {
    return res.status(400).json(err);
  }
};
exports.deleteProduct =  (req, res) => {
    const id = req.params.id
  try {
    Products.findByIdAndDelete(id,(err,product)=>{
        if (err) return res.status(400).json(err);
        if(product){
            return res.status(200).json({
                message : 'Product  Deleted'
            })
        }else{
            return res.status(400).json({
                message : 'Product Not Deleted'
            })
        }
    })
    
    
  } catch (err) {
    return res.status(400).json(err);
  }
};
exports.updateProduct =  (req, res) => {
    const id = req.params.id
    const { title, price, description, quantity } = req.body;
  try {
    Products.findByIdAndUpdate(id,{
        title, price, description, quantity
    },{new : true},(err,product)=>{
        if (err) return res.status(400).json(err);
        if(product){
            return res.status(200).json({
                message : 'Product  Updated',
                product
            })
        }else{
            return res.status(400).json({
                message : 'Product Not Updated'
            })
        }
    })
    
    
  } catch (err) {
    return res.status(400).json(err);
  }
};
