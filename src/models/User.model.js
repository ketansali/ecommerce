const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
        firstName : {
            type : String,
            required : true
        },
        lastName : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        }
},{timestamps:true})

userSchema.pre('save',async function(){
    this.password = await bcrypt.hash(this.password,10) 
})

userSchema.methods = {
    authenticated : async function(pass){
        return await bcrypt.compare(pass,this.password)
    }
}

module.exports = mongoose.model('User',userSchema)