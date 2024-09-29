import React, { useState } from 'react'; // Import React and useState hook
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Router components for routing
import Home from './pages/Home'; // Import Home component for the home page
import Login from './pages/Login'; // Import Login component for the login page
import Register from './pages/Register'; // Import the Register component for user registration
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import './App.css'; // Import custom CSS for the app

const App = () => {
    // State to track whether the user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            {/* Define routes for the application */}
            <Routes>
                {/* Route for the home page */}
                <Route
                    path="/home"
                    element={isAuthenticated ? <Home /> : <Navigate to="/login" />} // If authenticated, show Home; otherwise redirect to Login
                />
                {/* Route for the login page */}
                <Route
                    path="/login"
                    element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />} // Pass a prop to Login to set authentication state on successful login
                />
                {/* Route for the registration page */}
                <Route
                    path="/register" // Add route for the register page
                    element={<Register />} // Render the Register component
                />
            </Routes>
        </Router>
    );
};

export default App; // Export the App component for use in other parts of the application
