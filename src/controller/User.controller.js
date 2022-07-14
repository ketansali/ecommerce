const User = require('../models/User.model')
const jwt = require('jsonwebtoken')

exports.signUp = (req,res)=>{

    const {firstName,lastName,email,password} = req.body
    try{
            User.findOne({email:email}).exec((err,user)=>{
                if(err) return res.status(400).json(err)
                if(user) return res.status(400).json({
                    message : 'User Already Exited'
                })

                const _user = User({firstName,lastName,email,password})
                _user.save((err,user)=>{
                    if(err) return res.status(400).json(err)
                    return res.status(201).json({
                        message : 'User SignUp Successfully',
                        user
                    })
                })
            })
    }catch(err){
        return res.status(400).json(err)
    }
}
exports.signIn = (req,res)=>{

    const {email,password} = req.body
    try{
            User.findOne({email:email}).exec(async(err,user)=>{
                if(err) return res.status(400).json(err)
                if(!user) return res.status(400).json({
                    message : 'User Not Exited'
                })
                const isMatch = await user.authenticated(password)

                if(isMatch){
                        const token = await jwt.sign({user:user},process.env.JWTKEY)
                        return res.status(200).json({
                            message : 'LogIn Successfully',
                            token
                        })
                }else{
                    return res.status(400).json({
                        message : 'Wrong Password'
                    })
                }

               
            })
    }catch(err){
        return res.status(400).json(err)
    }
}