import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ExpenseTracker from './pages/ExpenseTracker'; // Assuming you have this component for authenticated view
import './App.css';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

    const handleLogout = () => {
        setToken('');
        setUserId('');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/login"
                        element={!token ? <Login setToken={setToken} setUserId={setUserId} /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/register"
                        element={!token ? <Register setToken={setToken} setUserId={setUserId} /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/"
                        element={token ? <ExpenseTracker userId={userId} handleLogout={handleLogout} /> : <Navigate to="/login" />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
