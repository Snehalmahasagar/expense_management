const express = require("express");
const {
  addTransaction,
  getAlltransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionctrl");

const router = express.Router();
router.post("/add-transaction", addTransaction);

router.post("/edit-transaction", editTransaction);

router.post("/delete-transaction", deleteTransaction);

router.post("/get-transaction", getAlltransaction);
module.exports = router;
