const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
        userId : {
            type: mongoose.Schema.Types.ObjectID,
            required : true,
            ref : `User`
        },
        cartItems: [{
            item: {type: mongoose.Schema.Types.ObjectID, ref: 'Products'},
            quantity: {type: Number, default: 1},
        }]
},{timestamps:true})

module.exports = mongoose.model('Cart',cartSchema)