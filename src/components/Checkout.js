// src/components/Checkout.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51Q6IidKQcaWD8HrkZPYq3U6vMwzpumc8n9s9TXTWdFWGFCzhc8SYgmSLkIxkC1n7d1IQpjlC28jWRvdGIxogy0Cz00s74mfKoY'); // Replace with your Stripe publishable key

const Checkout = ({ cartItems }) => {
    const handleCheckout = async () => {
        const stripe = await stripePromise;

        // Send a request to your backend to create a checkout session
        const response = await axios.post('http://localhost:5000/api/create-checkout-session', {
            items: cartItems,
        });

        const sessionId = response.data.id;

        // Redirect to the checkout page
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div>
            <button className="btn btn-success" onClick={handleCheckout}>
                Checkout
            </button>
        </div>
    );
};

export default Checkout;
