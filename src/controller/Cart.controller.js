const Cart = require("../models/Cart.model");

// exports.addToCart = (req,res)=>{
//     try{
//         const userId = req.user.user._id
//         Cart.findOne({userId :userId}).exec(async(err,cart)=>{
//             if(err) return res.status(400).json(err)
//             if(cart){

//                 req.body.cartItems.forEach(async cartItem => {
//                     const itemId = cartItem.item
//                     // const itemAvilable = cart.cartItems.find(c=>c.item ==itemId)
//                     // if(itemAvilable){
//                     //     cart.cartItems.quantity = cartItem.quantity
//                     //    // cart.save()
//                     //     // let productItem = cart.products[itemIndex];
//                     //     // productItem.quantity = quantity;
//                     //     // cart.products[itemIndex] = productItem;

//                     // }else{
//                     //    cart.cartItems.push(cartItem)
//                     //    cart.save()
//                     // }

//                     let itemIndex = cart.cartItems.findIndex(c=>c.item ==itemId);
//                 if (itemIndex > -1) {
//                     //product exists in the cart, update the quantity
//                     let productItem = cart.cartItems[itemIndex];
//                     productItem.quantity = cartItem.quantity;
//                     cart.cartItems[itemIndex] = productItem;
//                 } else {
//                     //product does not exists in cart, add new item
//                     cart.cartItems.push(cartItem)
//                 }
//                 cart = await  cart.save();
//                 return res.status(201).send(cart);

//                 });

//             }else{
//                 const cart = Cart({
//                     userId : req.user.user._id,
//                     cartItems : req.body.cartItems
//                 })
//                 cart.save((err, cart) => {
//                     if (err) return res.status(400).json(err);
//                     if (cart) {
//                       return res.status(201).json({
//                         message : "Item Added",
//                         cart});
//                     }
//                   });

//             }
//         })
//     }catch(err){
//         return res.status(400).json(err)
//     }
// }
exports.addToCart = (req, res) => {
  try {
    const userId = req.user.user._id;
    const { item, quantity } = req.body;
    Cart.findOne({ userId: userId }).exec(async (err, cart) => {
      if (err) return res.status(400).json(err);
      if (cart) {
        //cart exists for user
        let itemIndex = cart.cartItems.findIndex((p) => p.item == item);
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.cartItems[itemIndex];
          productItem.quantity = quantity;
          cart.cartItems[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          cart.cartItems.push({ item: item, quantity: quantity });
        }
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
        const cart = Cart({
          userId: req.user.user._id,
          cartItems: {
            item,
            quantity,
          },
        });
        cart.save((err, cart) => {
          if (err) return res.status(400).json(err);
          if (cart) {
            return res.status(201).json({
              message: "Item Added",
              cart,
            });
          }
        });
      }
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};
exports.getCartItem = (req, res) => {
  try {
    const userId = req.user.user._id;
    Cart.findOne({ userId: userId })
      .populate("cartItems.item", "title price")
      .exec((err, cart) => {
        if (err) return res.status(400).json(err);
        if (cart) {
          return res.status(200).json(cart);
        } else {
          return res.status(404).json({
            message: "Cart Not Found",
          });
        }
      });
  } catch (err) {
    return res.status(400).json(err);
  }
};
exports.removeCartItem = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.user._id;
   const itemRemoved = await Cart.updateOne({userId:userId},{
        $pull: {
            cartItems : {
                item:id
            }
        }
    })
    if(itemRemoved){
        return res.status(200).json({
            message: "item Removed"
        })
    }else{
        return res.status(200).json({
            message: "item Not Removed"
        })
    } 
  } catch (err) {
    return res.status(400).json(err);
  }
};
