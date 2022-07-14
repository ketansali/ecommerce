const { createInvoice, getAllInvoices, deleteInvoice, updateInvoice } = require('../controller/Invoice.controller')
const { requireSignIn } = require('../middleware/authetication')
const { invoiceValidation } = require('../validation/Invoice.validation')


const router = require('express').Router()

router.post('/invoice/createInvoice/:id',requireSignIn,invoiceValidation,createInvoice)
router.post('/invoice/deleteInvoice/:id',requireSignIn,deleteInvoice)
router.post('/invoice/updateInvoice/:id',requireSignIn,updateInvoice)
router.get('/invoice/getAllInvoices',requireSignIn,getAllInvoices)



module.exports =router