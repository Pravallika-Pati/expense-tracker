const express= require("express");
const req = require("express/lib/request");
const router=express.Router();

const {getTransactions,addTransaction,deleteTransaction}=require('../controllers/transactions');

router.route('/').get(getTransactions).post(addTransaction);

router.route('/:id').delete(deleteTransaction);

module.exports = router;
