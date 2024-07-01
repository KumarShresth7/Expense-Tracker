import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css'; // Assuming you have separate CSS for styling
import { Link } from 'react-router-dom';

const Login = ({ setToken, setUserId }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            setToken(res.data.token);
            setUserId(res.data.userId);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
        } catch (err) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="auth-form">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={loginUser}>Login</button>
            <br/><br/>
            <Link to='/register'>New User?</Link>
        </div>
    );
};

export default Login;
