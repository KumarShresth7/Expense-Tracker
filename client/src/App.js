import React,{useEffect,useState} from 'react'
import './App.css';
import axios from 'axios'

function App() {
  const [expenses, setexpenses] = useState([])
  const [title, settitle] = useState('')
  const [amount, setamount] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:5000/api/expense')
    .then(res=>setexpenses(res.data))
    .catch(err=>console.log(err))
  },[])

  const addExpense = () =>{
    axios.post('http://localhost:5000/api/expense',{title,amount})
    .then(res=>setexpenses([...expenses],res.data))
    .catch(err=>console.log(err))
  }

  const deleteExpense = (id)=>{
    axios.delete(`http://localhost:5000/api/expense/${id}`)
    .then(()=>setexpenses(expenses.filter(exp=> exp._id!==id)))
    .catch(err=>console.log(err))
  }

  return (
    <div className='App'>
      <h1>Expense Tracker</h1>
      <div>
        <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e)=>settitle(e.target.value)}/>

        <input
        type='number'
        placeholder='Amount'
        value={amount}
        onChange={(e)=>setamount(e.target.value)}/>

        <button onClick={addExpense}>Add Expense</button>
      </div>

      <ul>
        {expenses.map(exp=>(
          <li key={exp._id}>
            {exp.title} - ${exp.amount}
            <button onClick={()=>deleteExpense(exp._id)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
