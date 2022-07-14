const Joi = require('joi')


exports.productValidation = (req,res,next)=>{

    const productSchema = Joi.object().keys({
        title : Joi.string().alphanum().required(),
        price : Joi.number().required(),
        description : Joi.string().required(),
        quantity : Joi.number().required(),

        
    })
    const {error} = productSchema.validate(req.body); 
   if(!error) return next()
    const message = error.details.map(e=>e.message)
   return res.status(400).json({error:message})
}