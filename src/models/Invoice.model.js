const mongoose = require("mongoose");
const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: `User`,
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: `Cart`,
    },
    contact: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
