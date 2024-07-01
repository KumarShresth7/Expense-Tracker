import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css'; // Assuming you have separate CSS for styling
import {Link} from 'react-router-dom'

const Register = ({ setToken, setUserId }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { username, password });
            setToken(res.data.token);
            setUserId(res.data.userId);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <div className="auth-form">
            <h2>Register</h2>
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
            <button onClick={registerUser}>Register</button>
            <br/><br/>
            <Link to='/login'>Already a User?</Link>
            
        </div>
    );
};

export default Register;
