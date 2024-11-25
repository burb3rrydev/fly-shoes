import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onAdminLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Update the URL to point to the correct server (localhost:5000)
        try {
            const response = await axios.post('http://localhost:5000/api/admin/login', { username, password });
    
            if (response.data.success) {
                onAdminLoginSuccess(); // Update parent state on success
                navigate('/admin/dashboard'); // Redirect to the admin dashboard
            } else {
                setErrorMessage('Invalid username or password.');
            }
        } catch (error) {
            setErrorMessage('Error logging in. Please try again.');
        }
    };
    

    return (
        <div className="container">
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
            </form>
            {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        </div>
    );
};

export default AdminLogin;
