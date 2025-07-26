import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // ✅ Use secured axios instance
import './CustomersLis.css'; // ✅ Ensure styling exists

function CustomersList() {
    const [search, setSearch] = useState('');
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');

        if (!search.trim()) return;

        setLoading(true);
        setSearched(true);

        try {
            const res = await axiosInstance.get(`/customers?search=${encodeURIComponent(search)}`);
            setCustomers(res.data);
        } catch (err) {
            console.error('❌ Error fetching customers:', err);
            const msg = err.response?.data?.message || 'Failed to fetch customer data';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="customers-container">
            <h2>🔍 Search Customers</h2>

            <form className="search-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Enter Customer ID or Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}

            {!loading && customers.length > 0 && (
                <div className="table-container">
                    <table className="customers-table">
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(customer => (
                                <tr key={customer.customer_id}>
                                    <td>{customer.customer_id}</td>
                                    <td>{customer.full_name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && searched && customers.length === 0 && !error && (
                <p>No customers found for: <strong>{search}</strong></p>
            )}
        </div>
    );
}

export default CustomersList;
