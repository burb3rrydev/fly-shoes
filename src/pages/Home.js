import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = ({ addToCart }) => {
    const [shoes, setShoes] = useState([]);
    const [filteredShoes, setFilteredShoes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [priceRanges, setPriceRanges] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term

    // Fetch shoes data and distinct brands, sizes, and price ranges
    useEffect(() => {
        const fetchShoes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/shoes');
                const shoeData = response.data;
                setShoes(shoeData);
                setFilteredShoes(shoeData);

                // Extract distinct brands and sizes from the shoe data
                const distinctBrands = [...new Set(shoeData.map(shoe => shoe.brand))];
                const distinctSizes = [...new Set(shoeData.map(shoe => shoe.size))];
                
                // Generate price ranges based on the shoe prices
                const allPrices = shoeData.map(shoe => shoe.price);
                const minPrice = Math.min(...allPrices);
                const maxPrice = Math.max(...allPrices);
                const priceRanges = [
                    { label: `$0 - $50`, min: 0, max: 50 },
                    { label: `$51 - $100`, min: 51, max: 100 },
                    { label: `$101 - $150`, min: 101, max: 150 },
                    { label: `$151 - $200`, min: 151, max: 200 },
                    { label: `$201+`, min: 201, max: maxPrice }
                ];

                setBrands(distinctBrands);
                setSizes(distinctSizes);
                setPriceRanges(priceRanges);
            } catch (error) {
                console.error('Error fetching shoes:', error);
            }
        };

        fetchShoes();
    }, []);

    // Handle brand filter
    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
    };

    // Handle size filter
    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };

    // Handle price filter
    const handlePriceChange = (e) => {
        setSelectedPriceRange(e.target.value);
    };

    // Handle search term change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter shoes based on selected brand, size, price range, and search term
    useEffect(() => {
        let filtered = shoes;

        if (selectedBrand) {
            filtered = filtered.filter(shoe => shoe.brand === selectedBrand);
        }

        if (selectedSize) {
            filtered = filtered.filter(shoe => shoe.size === selectedSize);
        }

        if (selectedPriceRange) {
            const { min, max } = priceRanges.find(range => range.label === selectedPriceRange);
            filtered = filtered.filter(shoe => shoe.price >= min && shoe.price <= max);
        }

        if (searchTerm) {
            filtered = filtered.filter(shoe => 
                shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                shoe.brand.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredShoes(filtered);
    }, [selectedBrand, selectedSize, selectedPriceRange, shoes, priceRanges, searchTerm]);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Shoe Collection</h2>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name or brand..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Filters */}
            <div className="mb-4">
                <div className="row">
                    {/* Brand Filter */}
                    <div className="col-md-4">
                        <select
                            className="form-select"
                            value={selectedBrand}
                            onChange={handleBrandChange}
                        >
                            <option value="">Select Brand</option>
                            {brands.map((brand, index) => (
                                <option key={index} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Size Filter */}
                    <div className="col-md-4">
                        <select
                            className="form-select"
                            value={selectedSize}
                            onChange={handleSizeChange}
                        >
                            <option value="">Select Size</option>
                            {sizes.map((size, index) => (
                                <option key={index} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Price Filter */}
                    <div className="col-md-4">
                        <select
                            className="form-select"
                            value={selectedPriceRange}
                            onChange={handlePriceChange}
                        >
                            <option value="">Select Price Range</option>
                            {priceRanges.map((range, index) => (
                                <option key={index} value={range.label}>
                                    {range.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Shoes Grid */}
            <div className="row">
                {filteredShoes.map((shoe) => (
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
