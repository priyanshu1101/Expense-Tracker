const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const expenseSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    description: String
});

const ExpenseModel = mongoose.model('Expense', expenseSchema);

module.exports = {
    getExpensesBasedOnFilter: ({ category, date, currPage, pageLength }) => {
        const matchQuery = {};
        if (category) matchQuery.category = category;
        if (date) {
            const startOfDay = DateTime.fromISO(date).startOf("day").toJSDate();
            const endOfDay = DateTime.fromISO(date).endOf("day").toJSDate();

            matchQuery.date = { $gte: startOfDay, $lte: endOfDay };
        }

        return ExpenseModel.aggregate([
            { $match: matchQuery },
            {
                $facet: {
                    totalCount: [{ $count: "count" }],
                    expenses: [
                        {
                            $project: {
                                amount: 1,
                                category: 1,
                                date: 1,
                                description: 1
                            }
                        },
                        { $skip: (currPage - 1) * pageLength },
                        { $limit: pageLength }
                    ]
                }
            },
            {
                $project: {
                    totalCount: { $ifNull: [{ $arrayElemAt: ["$totalCount.count", 0] }, 0] },
                    expenses: 1
                }
            }
        ]);
    },
    getTotalExpenses: async ({ start, end }) => {
        return ExpenseModel.aggregate([
            {
                $match: {
                    date: {
                        $gte: DateTime.fromISO(start).startOf("day").toJSDate(),
                        $lte: DateTime.fromISO(end).endOf("day").toJSDate()
                    }
                }
            },
            {
                $group: {
                    _id: "$category",
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);
    },
    createExpense: async ({ amount, category, date, description }) => {
        const newExpense = new ExpenseModel({
            amount,
            category,
            date: DateTime.fromISO(date).toJSDate(),
            description
        });

        try {
            await newExpense.save();
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
    }
}