const express = require('express')
const {getExpense,postExpense,deleteExpense} = require('../controllers/expenseController')
const {protect} = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/',protect,getExpense)
router.post('/',protect,postExpense)
router.delete('/:id',protect,deleteExpense)

module.exports = router