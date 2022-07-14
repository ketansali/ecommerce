require('dotenv').config()
require('./Db/conn')
const express = require('express')

const PORT = process.env.PORT || 7600

const userRoutes = require('./routes/User.routes') 
const productsRoutes = require('./routes/Products.routes')
const cartRoutes = require('./routes/Cart.routes')
const invoiceRoutes = require('./routes/Invoice.routes')
const app = express()
const swaggerJson = require('./swagger/swagger.json')
const swaggerUi = require('swagger-ui-express')
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerJson))




//routes
app.use(express.json())
app.use('/api',userRoutes)
app.use('/api',productsRoutes)
app.use('/api',cartRoutes)
app.use('/api',invoiceRoutes)











app.listen(PORT,()=>{
    console.log(`Server is Running On PORT :${PORT}`);
})