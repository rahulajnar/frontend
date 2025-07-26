import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // ✅ Use the authenticated instance

function AccountsList() {
    const [account, setAccount] = useState(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!search.trim()) {
            setError('Please enter an Account ID');
            setAccount(null);
            return;
        }

        try {
            setLoading(true);
            setError('');
            setAccount(null);

            const response = await axiosInstance.get(`/accounts?search=${search}`); // ✅ Authenticated request

            if (response.data.length === 0) {
                setError('No account found.');
            } else {
                setAccount(response.data[0]);
            }
        } catch (err) {
            console.error('🔴 Error fetching account:', err);
            setError(err.response?.data?.error || 'Server error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>🔍 Search Account</h2>

            <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter Account ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {account && (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Account ID</th>
                            <th>Customer ID</th>
                            <th>Branch ID</th>
                            <th>Account Number</th>
                            <th>Account Type</th>
                            <th>Balance</th>
                            <th>Opened On</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{account.account_id}</td>
                            <td>{account.customer_id}</td>
                            <td>{account.branch_id}</td>
                            <td>{account.account_number}</td>
                            <td>{account.account_type}</td>
                            <td>{account.balance}</td>
                            <td>{new Date(account.opened_on).toLocaleDateString()}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AccountsList;
