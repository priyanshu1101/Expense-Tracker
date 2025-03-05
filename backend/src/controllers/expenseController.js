const expenseService = require('../services/expenseService');
const luxon = require('luxon');

const getExpenses = async (req, res) => {
    let { category, date, pageNo, limit } = req.query;
    if (!pageNo || !limit) {
        return res.status(400).json({ ok: false, err: "Page number and limit are required" });
    }
    pageNo = parseInt(pageNo);
    limit = parseInt(limit);
    try {
        const response = await expenseService.getExpenses(category, date, pageNo, limit);
        if (response.ok) {
            return res.status(200).json({ ok: true, data: response.data });
        }
        return res.status(404).json({ ok: false, err: response.err });
    }
    catch (e) {
        return res.status(500).json({ ok: false, err: e.message });
    }
};

const createExpense = async (req, res) => {
    const { amount, category, date, description } = req.body;
    if (!amount || !category || !date) {
        return res.status(400).json({ ok: false, err: "Amount, category and date are required" });
    }

    try {
        const response = await expenseService.createExpense({ amount, category, date, description });
        if (response.ok) {
            return res.status(201).json({ ok: true, data: response.data });
        }
        return res.status(404).json({ ok: false, err: response.err });
    }
    catch (e) {
        return res.status(500).json({ ok: false, err: e.message });
    }
}

const getTotalExpenses = async (req, res) => {
    const { start, end, currPage, pageLength } = req.query;
    if (!start || !end) {
        return res.status(400).json({ ok: false, err: "Start and end date are required" });
    }

    try {
        const response = await expenseService.getTotalExpenses({ start, end, currPage, pageLength });
        if (response.ok) {
            return res.status(200).json({ ok: true, data: response.data });
        }
        return res.status(404).json({ ok: false, err: response.err });
    }
    catch (e) {
        return res.status(500).json({ ok: false, err: e.message });
    }
}

module.exports = {
    getExpenses,
    createExpense,
    getTotalExpenses
};