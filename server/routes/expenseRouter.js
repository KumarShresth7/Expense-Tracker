const express = require('express')
const {getExpense,postExpense,deleteExpense} = require('../controllers/expenseController')
const router = express.Router()

router.get('/',getExpense)
router.post('/',postExpense)
router.delete('/:id',deleteExpense)

module.exports = router