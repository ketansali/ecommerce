const { addToCart, getCartItem, removeCartItem } = require('../controller/Cart.controller')

const { requireSignIn } = require('../middleware/authetication')
const { cartValidation } = require('../validation/Cart.validation')


const router = require('express').Router()

router.post('/cart/addToCart',requireSignIn,cartValidation,addToCart)
router.post('/cart/removeCartItem/:id',requireSignIn,removeCartItem)
router.get('/cart/getCartItem',requireSignIn,getCartItem)



module.exports =router