const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.params.userId });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching expenses' });
    }
};

exports.addExpense = async (req, res) => {
    try {
        const { userId, description, amount } = req.body;
        const newExpense = new Expense({ userId, description, amount });
        const savedExpense = await newExpense.save();
        res.json(savedExpense);
    } catch (err) {
        res.status(500).json({ message: 'Error adding expense' });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: 'Expense deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting expense' });
    }
};
