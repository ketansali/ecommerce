const { addProduct, getAllProduct, deleteProduct, updateProduct } = require('../controller/Product.controller')
const { requireSignIn } = require('../middleware/authetication')
const { productValidation } = require('../validation/Product.validation')


const router = require('express').Router()

router.post('/products/addProduct',requireSignIn,productValidation,addProduct)
router.get('/products/getAllProduct',requireSignIn,getAllProduct)
router.post('/products/deleteProduct/:id',requireSignIn,deleteProduct)
router.post('/products/updateProduct/:id',requireSignIn,updateProduct)



module.exports =router