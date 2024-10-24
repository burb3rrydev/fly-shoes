// src/pages/Cart.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51Q6IidKQcaWD8HrkZPYq3U6vMwzpumc8n9s9TXTWdFWGFCzhc8SYgmSLkIxkC1n7d1IQpjlC28jWRvdGIxogy0Cz00s74mfKoY'); // Replace with your Stripe publishable key

const Cart = ({ cartItems, updateQuantity, removeFromCart }) => {
    const handleQuantityChange = (shoe, e) => {
        updateQuantity(shoe, e.target.value);
    };

    const handleCheckout = async () => {
        const stripe = await stripePromise;

        // Create an array of items for the checkout session
        const items = cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image_url: item.image_url,
        }));

        // Send a request to your backend to create a checkout session
        const response = await axios.post('http://localhost:5000/api/create-checkout-session', {
            items,
        });
        
        const sessionId = response.data.id;

        // Redirect to the checkout page
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td><img src={item.image_url} alt={item.name} style={{ width: '50px' }} /></td>
                                    <td>{item.name}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item, e)}
                                            min="1"
                                            className="form-control"
                                        />
                                    </td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => removeFromCart(item)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-center">
                        <button className="btn btn-success" onClick={handleCheckout}>
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
