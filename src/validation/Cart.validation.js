const Joi = require('joi')


exports.cartValidation = (req,res,next)=>{

    const cartSchema = Joi.object().keys({
        item : Joi.string().alphanum().required(),
        quantity : Joi.number().required(),
        

        
    })
    const {error} = cartSchema.validate(req.body); 
   if(!error) return next()
    const message = error.details.map(e=>e.message)
   return res.status(400).json({error:message})
}