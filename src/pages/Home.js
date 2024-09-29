// src/pages/Home.js
import React, { useEffect, useState } from 'react'; // Import necessary React modules
import axios from 'axios'; // Import Axios for making HTTP requests
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling

const Home = () => {
    // State to hold the array of shoes
    const [shoes, setShoes] = useState([]);

    // useEffect hook to fetch shoes when the component mounts
    useEffect(() => {
        // Async function to fetch shoe data from the API
        const fetchShoes = async () => {
            try {
                // Make GET request to fetch shoes from the server
                const response = await axios.get('http://localhost:5000/api/shoes');
                // Update the state with the fetched shoe data
                setShoes(response.data);
            } catch (error) {
                // Log an error if the request fails
                console.error('Error fetching shoes:', error);
            }
        };

        // Call the fetchShoes function to initiate the API request
        fetchShoes();
    }, []); // Empty dependency array ensures this runs only once on component mount

    return (
        <div className="container mt-5"> {/* Main container for the page */}
            <h2 className="text-center mb-4">Shoe Collection</h2> {/* Title for the shoe collection */}
            <div className="row"> {/* Bootstrap row for shoe cards */}
                {shoes.map((shoe) => ( // Map through each shoe in the shoes array
                    <div key={shoe.id} className="col-md-4 mb-4"> {/* Card container for each shoe */}
                        <div className="card h-100"> {/* Bootstrap card component */}
                            <img src={shoe.image_url} className="card-img-top" alt={shoe.name} /> {/* Shoe image */}
                            <div className="card-body"> {/* Card body containing shoe details */}
                                <h5 className="card-title">{shoe.name}</h5> {/* Shoe name */}
                                <p className="card-text"> {/* Shoe details paragraph */}
                                    <strong>Brand:</strong> {shoe.brand} <br /> {/* Shoe brand */}
                                    <strong>Category:</strong> {shoe.category} <br /> {/* Shoe category */}
                                    <strong>Size:</strong> {shoe.size} <br /> {/* Shoe size */}
                                    <strong>Price:</strong> $99.99 {/* Placeholder for shoe price */}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home; // Export the Home component for use in other parts of the application
