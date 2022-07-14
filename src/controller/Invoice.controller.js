const Invoice = require('../models/Invoice.model')


exports.createInvoice = (req,res)=>{
    try{
        const userId = req.user.user._id;
        const cartId = req.params.id
        const {contact,address,city,state} = req.body
        const invoice = Invoice({
            userId: userId,
            cartId:cartId,
            contact,address,city,state
        })
       
        invoice.save((err,invoice)=>{
            if(err) return res.status(400).json(err)
            return res.status(201).json({
                message : 'Invoice Created',
                invoice
            })
        })
    }catch(err){
        return res.status(400).json(err);
    }
}
exports.getAllInvoices = async (req,res)=>{
    try{
        const invoice = await Invoice.find().populate('userId cartId')
        if(invoice){
            return res.status(200).json(invoice)
        }else{
            return res.status(404).json({
                message : 'invoice Not Found'
            })
        }
    }catch(err){
        return res.status(400).json(err);
    }
}


exports.deleteInvoice =  (req, res) => {
    const id = req.params.id
  try {
    Invoice.findByIdAndDelete(id,(err,invoice)=>{
        if (err) return res.status(400).json(err);
        if(invoice){
            return res.status(200).json({
                message : 'Invoice  Deleted'
            })
        }else{
            return res.status(400).json({
                message : 'Invoice Not Deleted'
            })
        }
    })
    
    
  } catch (err) {
    return res.status(400).json(err);
  }
};


exports.updateInvoice =  (req, res) => {
    const id = req.params.id
    const {contact,address,city,state} = req.body
  try {
    Invoice.findByIdAndUpdate(id,{
        contact,address,city,state
    },{new : true},(err,invoice)=>{
        if (err) return res.status(400).json(err);
        if(invoice){
            return res.status(200).json({
                message : 'Invoice  Updated',
                invoice
            })
        }else{
            return res.status(400).json({
                message : 'Invoice Not Updated'
            })
        }
    })
    
    
  } catch (err) {
    return res.status(400).json(err);
  }
};