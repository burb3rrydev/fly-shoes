import React, { useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [shoe, setShoe] = useState({ name: '', image_url: '', size: '', brand: '', category: '', price: '' });
    const [shoeId, setShoeId] = useState('');
    const [message, setMessage] = useState('');

    const adminToken = localStorage.getItem('adminToken');
    const config = {
        headers: { Authorization: `Bearer ${adminToken}` }
    };

    const handleAddShoe = async () => {
        try {
            await axios.post('/api/admin/shoes', shoe, config);
            setMessage('Shoe added successfully');
        } catch (error) {
            setMessage('Error adding shoe');
        }
    };

    const handleUpdateShoe = async () => {
        try {
            await axios.put(`/api/admin/shoes/${shoeId}`, shoe, config);
            setMessage('Shoe updated successfully');
        } catch (error) {
            setMessage('Error updating shoe');
        }
    };

    const handleDeleteShoe = async () => {
        try {
            await axios.delete(`/api/admin/shoes/${shoeId}`, config);
            setMessage('Shoe deleted successfully');
        } catch (error) {
            setMessage('Error deleting shoe');
        }
    };

    const handleChange = (e) => {
        setShoe({ ...shoe, [e.target.name]: e.target.value });
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <form>
                <input type="text" name="name" placeholder="Name" value={shoe.name} onChange={handleChange} required />
                <input type="text" name="image_url" placeholder="Image URL" value={shoe.image_url} onChange={handleChange} required />
                <input type="text" name="size" placeholder="Size" value={shoe.size} onChange={handleChange} required />
                <input type="text" name="brand" placeholder="Brand" value={shoe.brand} onChange={handleChange} required />
                <input type="text" name="category" placeholder="Category" value={shoe.category} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" value={shoe.price} onChange={handleChange} required />
                <button type="button" onClick={handleAddShoe}>Add Shoe</button>
                <button type="button" onClick={handleUpdateShoe}>Update Shoe</button>
            </form>
            <input type="text" placeholder="Enter Shoe ID to Update/Delete" value={shoeId} onChange={(e) => setShoeId(e.target.value)} />
            <button type="button" onClick={handleDeleteShoe}>Delete Shoe</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AdminDashboard;
