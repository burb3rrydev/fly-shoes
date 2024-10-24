// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = ({ addToCart }) => {
    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        const fetchShoes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/shoes');
                setShoes(response.data);
            } catch (error) {
                console.error('Error fetching shoes:', error);
            }
        };

        fetchShoes();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Shoe Collection</h2>
            <div className="row">
                {shoes.map((shoe) => (
                    <div key={shoe.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img src={shoe.image_url} className="card-img-top" alt={shoe.name} />
                            <div className="card-body">
                                <h5 className="card-title">{shoe.name}</h5>
                                <p className="card-text">
                                    <strong>Brand:</strong> {shoe.brand} <br />
                                    <strong>Category:</strong> {shoe.category} <br />
                                    <strong>Size:</strong> {shoe.size} <br />
                                    <strong>Price:</strong> ${shoe.price}
                                </p>
                                <button className="btn btn-primary" onClick={() => addToCart(shoe)}>
                                    Buy
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
