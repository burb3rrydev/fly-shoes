import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Navbar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import AdminLogin from './pages/AdminLogin';  // Import AdminLogin page
import AdminDashboard from './pages/AdminDashboard';  // Import AdminDashboard page

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // User authentication state
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false); // Admin authentication state
    const [cartItems, setCartItems] = useState([]); // Cart state

    // Function to add items to the cart
    const addToCart = (shoe) => {
        const existingItem = cartItems.find((item) => item.id === shoe.id);
        if (existingItem) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === shoe.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...shoe, quantity: 1 }]);
        }
    };

    // Function to update quantity in the cart
    const updateQuantity = (shoe, quantity) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === shoe.id ? { ...item, quantity: parseInt(quantity, 10) } : item
            )
        );
    };

    // Function to remove items from the cart
    const removeFromCart = (shoe) => {
        setCartItems(cartItems.filter((item) => item.id !== shoe.id));
    };

    return (
        <Router>
            <Navbar cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />
            <Routes>
                {/* Home route */}
                <Route
                    path="/home"
                    element={
                        isAuthenticated ? (
                            <Home addToCart={addToCart} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                
                {/* Cart route */}
                <Route
                    path="/cart"
                    element={
                        isAuthenticated ? (
                            <Cart
                                cartItems={cartItems}
                                updateQuantity={updateQuantity}
                                removeFromCart={removeFromCart}
                            />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                
                {/* User Login route */}
                <Route
                    path="/login"
                    element={
                        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
                    }
                />

                {/* Register route */}
                <Route path="/register" element={<Register />} />

                {/* Admin Login route */}
                <Route
                    path="/admin/login"
                    element={
                        <AdminLogin onAdminLoginSuccess={() => setIsAdminAuthenticated(true)} />
                    }
                />

                {/* Admin Dashboard route */}
                <Route
                    path="/admin/dashboard"
                    element={
                        isAdminAuthenticated ? (
                            <AdminDashboard />
                        ) : (
                            <Navigate to="/admin/login" />
                        )
                    }
                />

                {/* Success and Cancel routes */}
                <Route path="/success" element={<Success />} />
                <Route path="/cancel" element={<Cancel />} />

                {/* Default redirect */}
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </Router>
    );
};

export default App;
