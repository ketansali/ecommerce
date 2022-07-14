const jwt = require('jsonwebtoken')


exports.requireSignIn = (req,res,next)=>{
    if(req.headers.authorization){
        const token  = req.headers.authorization.split(' ')[1]
        jwt.verify(token,process.env.JWTKEY,(err,user)=>{
            if(err) return res.status(400).json(err)
            if(user){
                req.user = user
                next()
            }
        })
    }else{
        return res.status(400).json({
            message : 'Authorization token required'
        })
    }
}