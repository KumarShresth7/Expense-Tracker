import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExpenseTracker.css'; // Create this file for styling
import { baseUrl } from '../baseUrl';

const ExpenseTracker = ({ userId, handleLogout }) => {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/expenses/${userId}`);
            setExpenses(res.data);
        } catch (err) {
            console.error('Error fetching expenses', err);
        }
    };

    const addExpense = async () => {
        try {
            const newExpense = { userId, description, amount };
            const res = await axios.post(`${baseUrl}/api/expenses`, newExpense);
            setExpenses([...expenses, res.data]);
            setDescription('');
            setAmount('');
        } catch (err) {
            console.error('Error adding expense', err);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${baseUrl}/api/expenses/${id}`);
            setExpenses(expenses.filter(expense => expense._id !== id));
        } catch (err) {
            console.error('Error deleting expense', err);
        }
    };

    return (
        <div className="expense-tracker">
            <h1>Expense Tracker</h1>
            <button onClick={handleLogout} className="logout-button">Logout</button>
            <div className="add-expense">
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={addExpense}>Add Expense</button>
            </div>
            <div className="expense-list">
                {expenses.map(expense => (
                    <div key={expense._id} className="expense-item">
                        <span>{expense.description}</span>
                        <span>₹{expense.amount}</span>
                        <button onClick={() => deleteExpense(expense._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseTracker;
