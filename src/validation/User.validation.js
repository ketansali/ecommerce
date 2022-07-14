const Joi = require('joi')


exports.signUpValidation = (req,res,next)=>{

    const userSchema = Joi.object().keys({
        firstName : Joi.string().alphanum().required(),
        lastName : Joi.string().alphanum().required(),
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })
    const {error} = userSchema.validate(req.body); 
   if(!error) return next()
    const message = error.details.map(e=>e.message)
   return res.status(400).json({error:message})
}
exports.signInValidation = (req,res,next)=>{

    const userSchema = Joi.object().keys({
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })
    const {error} = userSchema.validate(req.body); 
    if(!error) return next()
    const message = error.details.map(e=>e.message)
   return res.status(400).json({error:message})
}
  