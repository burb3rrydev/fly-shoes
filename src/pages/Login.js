// Import necessary libraries and hooks from React and axios
import React, { useState } from 'react'; // React and useState hook for state management
import { useNavigate } from 'react-router-dom'; // useNavigate hook for navigation
import axios from 'axios'; // axios for making HTTP requests

// Define the Login component, accepting onLoginSuccess as a prop
const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState(''); // State for storing the username input
    const [password, setPassword] = useState(''); // State for storing the password input
    const [error, setError] = useState(''); // State for storing error messages
    const navigate = useNavigate(); // Initialize the useNavigate hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username,
                password,
            });

            if (response.data.success) {
                onLoginSuccess(); // Call the onLoginSuccess prop function to indicate success
                navigate('/home'); // Redirect to the home page
            } else {
                setError('Invalid credentials'); // Set an error message if credentials are invalid
            }
        } catch (error) {
            setError('Login failed'); // Set a generic error message
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Login</h3>
                            {error && <div className="alert alert-danger">{error}</div>} {/* Show error message if exists */}
                            <form onSubmit={handleLogin}> {/* Attach handleLogin to form submission */}
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username} // Bind input value to username state
                                        onChange={(e) => setUsername(e.target.value)} // Update username state on input change
                                        required // Mark this field as required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password} // Bind input value to password state
                                        onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                                        required // Mark this field as required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-4">
                                    Login {/* Submit button for the form */}
                                </button>
                            </form>
                            <div className="mt-4 text-center">
                                {/* Button to navigate to the Register page */}
                                <button
                                    onClick={() => navigate('/register')}
                                    className="btn btn-secondary mr-2"
                                >
                                    Register
                                </button>

                                {/* Button to navigate to the Admin Login page */}
                                <button
                                    onClick={() => navigate('/admin/login')}
                                    className="btn btn-secondary"
                                >
                                    Admin Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Export the Login component for use in other parts of the application
export default Login;
