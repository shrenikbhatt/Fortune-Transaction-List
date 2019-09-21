const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Transaction Model
const Transaction = require("../../models/Transaction");

// @route   GET api/transactions
// @desc    Get all transactions
// @access  Private
router.get("/", (req, res) => {
  Transaction.find()
    .sort({ date: -1 })
    .then(transactions => res.json(transactions));
});

// @route   POST api/transactions
// @desc    Post new transaction
// @access  Private
router.post("/", auth, (req, res) => {
  const newTransaction = new Transaction({
    category: req.body.category,
    vendor: req.body.vendor,
    amount: req.body.amount
  });

  newTransaction.save().then(transaction => res.json(transaction));
});

// @route   DELETE api/transactions
// @desc    Delete existing transaction
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Transaction.findById(req.params.id)
    .then(transaction =>
      transaction.remove().then(() => res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
