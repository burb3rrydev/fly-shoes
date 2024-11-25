import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [shoes, setShoes] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedShoe, setSelectedShoe] = useState(null);
    const [newShoe, setNewShoe] = useState({
        name: '',
        image_url: '',
        size: '',
        brand: '',
        category: '',
        price: ''
    });
    const navigate = useNavigate();

    // Fetch shoes when the component mounts
    useEffect(() => {
        axios.get('http://localhost:5000/api/shoes') // API to get shoes
            .then(response => {
                setShoes(response.data);
            })
            .catch(error => {
                console.error('Error fetching shoes:', error);
            });
    }, []);

    // Handle shoe deletion
    const handleDelete = (shoeId) => {
        axios.delete(`http://localhost:5000/api/admin/shoes/${shoeId}`)
            .then(response => {
                setShoes(shoes.filter(shoe => shoe.id !== shoeId));
            })
            .catch(error => {
                console.error('Error deleting shoe:', error);
            });
    };
    

    // Handle shoe update (editing)
    const handleEdit = (shoe) => {
        setSelectedShoe(shoe);
        setEditMode(true);
    };

    // Handle shoe form submission to update shoe
    const handleUpdate = (e) => {
        e.preventDefault();
        const { id, name, image_url, size, brand, category, price } = selectedShoe;
   
        axios.put(`http://localhost:5000/api/admin/shoes/${id}`, { name, image_url, size, brand, category, price })
            .then(response => {
                setShoes(prevShoes =>
                    prevShoes.map(shoe =>
                        shoe.id === id ? { ...shoe, name, image_url, size, brand, category, price } : shoe
                    )
                );
                setEditMode(false);
                setSelectedShoe(null);
            })
            .catch(error => {
                console.error('Error updating shoe:', error);
            });
    };

    // Handle new shoe form submission
    const handleAddShoe = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/api/admin/shoes', newShoe)
            .then(response => {
                setShoes([...shoes, response.data]); // Add the new shoe to the state
                setNewShoe({
                    name: '',
                    image_url: '',
                    size: '',
                    brand: '',
                    category: '',
                    price: ''
                }); // Reset form
            })
            .catch(error => {
                console.error('Error adding shoe:', error);
            });
    };

    return (
        <div className="container">
            <h1>Admin Dashboard</h1>
            <button className="btn btn-primary" onClick={() => navigate('/admin/dashboard')}>Go Back to Dashboard</button>

            {/* Show new shoe form */}
            <h3>Add New Shoe</h3>
            <form onSubmit={handleAddShoe}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newShoe.name}
                        onChange={(e) => setNewShoe({ ...newShoe, name: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newShoe.image_url}
                        onChange={(e) => setNewShoe({ ...newShoe, image_url: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Size</label>
                    <input
                        type="number"
                        className="form-control"
                        value={newShoe.size}
                        onChange={(e) => setNewShoe({ ...newShoe, size: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Brand</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newShoe.brand}
                        onChange={(e) => setNewShoe({ ...newShoe, brand: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newShoe.category}
                        onChange={(e) => setNewShoe({ ...newShoe, category: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={newShoe.price}
                        onChange={(e) => setNewShoe({ ...newShoe, price: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Add Shoe</button>
            </form>

            {/* Show edit form if in edit mode */}
            {editMode ? (
                <form onSubmit={handleUpdate}>
                    <h3>Edit Shoe</h3>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={selectedShoe.name}
                            onChange={(e) => setSelectedShoe({ ...selectedShoe, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input
                            type="text"
                            className="form-control"
                            value={selectedShoe.image_url}
                            onChange={(e) => setSelectedShoe({ ...selectedShoe, image_url: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Size</label>
                        <input
                            type="number"
                            className="form-control"
                            value={selectedShoe.size}
                            onChange={(e) => setSelectedShoe({ ...selectedShoe, size: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Brand</label>
                        <input
                            type="text"
                            className="form-control"
                            value={selectedShoe.brand}
                            onChange={(e) => setSelectedShoe({ ...selectedShoe, brand: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input
                            type="text"
                            className="form-control"
                            value={selectedShoe.category}
                            onChange={(e) => setSelectedShoe({ ...selectedShoe, category: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            className="form-control"
                            value={selectedShoe.price}
                            onChange={(e) => setSelectedShoe({ ...selectedShoe, price: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Update Shoe</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
                </form>
            ) : (
                // Display shoes in a table
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Size</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shoes.map(shoe => (
                            <tr key={shoe.id}>
                                <td>{shoe.name}</td>
                                <td><img src={shoe.image_url} alt={shoe.name} width="50" height="50" /></td>
                                <td>{shoe.size}</td>
                                <td>{shoe.brand}</td>
                                <td>{shoe.category}</td>
                                <td>{shoe.price}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => handleEdit(shoe)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(shoe.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboard;
