const transactionModel = require("../models/transactionModel.js");
const moment = require("moment");

const getAlltransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, userid, type } = req.body;

    const filter = {
      userid: userid,
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: new Date(selectedDate[0]),
              $lte: new Date(selectedDate[1]),
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    };

    const transactions = await transactionModel.find(filter);
    res.status(200).json(transactions);
  } catch (error) {
    console.log("Error in getAlltransaction:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).send("transaction deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const editTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.status(200).send("Edit successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Created");
  } catch (error) {
    console.log("Error in addTransaction:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAlltransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
