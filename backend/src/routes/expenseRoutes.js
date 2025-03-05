const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenseController');

router.get('/expenses', expenseController.getExpenses);
router.post('/expenses', expenseController.createExpense);
router.get('/expenses/total', expenseController.getTotalExpenses);

module.exports = router;