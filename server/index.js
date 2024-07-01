const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const app = express()
const PORT = process.env.PORT||5000

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'], // Add other headers as needed
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions))
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('MongoDB Connected'))
.catch((err)=>console.log(err))

app.get('/',(req,res)=>res.send('Expense Tracker API'))
app.use('/api/expenses',require('./routes/expenseRouter'))
app.use('/api/auth',require('./routes/authRouter'));
app.listen(PORT,()=>console.log(`Server is listening at ${PORT}`))
