const Expense = require('../models/Expense')

const getExpense = async(req,res) =>{
    try {
        const expense = await Expense.find()
        res.json(expense)
    } catch (error) {
        console.log(error)
    }
}

const postExpense = async(req,res)=>{
    try {
        const {title,amount} = req.body
        const newExpense = new Expense({
            title:title,
            amount:amount
        })
        const expense = await newExpense.save()
        res.json(expense)
    } catch (error) {
        console.log(error)
    }
}


const deleteExpense = async(req,res)=>{
    try {
        await Expense.findByIdAndDelete(req.params.id)
        res.json({msg:'Expense Removed'})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getExpense,
    postExpense,
    deleteExpense
}