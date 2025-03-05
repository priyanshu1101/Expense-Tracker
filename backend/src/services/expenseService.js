const Expense = require('../models/expenseModel');


const getExpenses = async (category, date, currPage = 1, pageLength = 10) => {
    try {
        const expenses = await Expense.getExpensesBasedOnFilter({ category, date, currPage, pageLength });
        return {
            ok: true,
            data: expenses
        }
    } catch (error) {
        return {
            ok: false,
            err: error.message
        }
    };
};

const getTotalExpenses = async ({ start, end }) => {
    try {
        const totalExpenses = await Expense.getTotalExpenses({ start, end });
        return {
            ok: true,
            data: totalExpenses
        }
    }
    catch (e) {
        return {
            ok: false,
            err: e.message
        }
    }
};

const createExpense = async ({ amount, category, date, description }) => {
    try {
        const newExpense = await Expense.createExpense({ amount, category, date, description });
        return {
            ok: true,
            data: newExpense
        }
    } catch (e) {
        return {
            ok: false,
            err: e.message
        }
    }
};

module.exports = {
    getExpenses,
    createExpense,
    getTotalExpenses
};