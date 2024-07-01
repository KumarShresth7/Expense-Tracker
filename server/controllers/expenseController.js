const Expense = require('../models/Expense');

const getExpense = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id });
        res.json(expenses);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

const postExpense = async (req, res) => {
    try {
        const { title, amount } = req.body;
        const newExpense = new Expense({
            title,
            amount,
            user: req.user.id
        });
        const expense = await newExpense.save();
        res.json(expense);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        await expense.remove();
        res.json({ msg: 'Expense removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};


module.exports = {
    getExpense,
    postExpense,
    deleteExpense
}
