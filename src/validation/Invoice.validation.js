const Joi = require('joi')


exports.invoiceValidation = (req,res,next)=>{

    const invoiceSchema = Joi.object().keys({
        contact : Joi.number().required(),
        address : Joi.string().alphanum().required(),
        city : Joi.string().alphanum().required(),
        state : Joi.string().alphanum().required()
        
        

        
    })
    const {error} = invoiceSchema.validate(req.body); 
   if(!error) return next()
    const message = error.details.map(e=>e.message)
   return res.status(400).json({error:message})
}