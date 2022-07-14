const mongoose = require('mongoose')
const  MONGO_USER = process.env.MONGO_USER
const  MONGO_PASS = process.env.MONGO_PASS
const  DB = process.env.DB

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.jc8ks.mongodb.net/${DB}?retryWrites=true&w=majority`).then(()=>{
    console.log('DataBase is Connected');
}).catch((err)=>{
    console.log(err);
})