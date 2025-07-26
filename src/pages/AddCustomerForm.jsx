import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // ✅ Use custom axios instance

function AddCustomerForm() {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        address: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { full_name, email, phone, address } = formData;

        const nameRegex = /^[A-Za-z\s]+$/;
        const emailRegex = /^\S+@\S+\.\S+$/;
        const phoneRegex = /^\d{10}$/;

        if (!full_name.trim()) return setMessage("Full name is required.");
        if (!nameRegex.test(full_name)) return setMessage("Full name should contain only letters and spaces.");
        if (!email.trim() || !emailRegex.test(email)) return setMessage("Please enter a valid email address.");
        if (!phone.trim() || !phoneRegex.test(phone)) return setMessage("Phone number must be exactly 10 digits.");
        if (!address.trim() || address.length < 5) return setMessage("Address must be at least 5 characters long.");

        try {
            const res = await axiosInstance.post('/customers', formData);
            setMessage(res.data.message);
            setFormData({ full_name: '', email: '', phone: '', address: '' });
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.error || 'Failed to add customer.');
        }
    };

    return (
        <div>
            <h2>Add New Customer</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone (10 digits)" value={formData.phone} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                <button type="submit">Add Customer</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddCustomerForm;
