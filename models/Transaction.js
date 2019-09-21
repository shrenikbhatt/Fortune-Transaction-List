const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Transaction Schema
const TransactionSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  vendor: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Transaction = mongoose.model("transaction", TransactionSchema);
