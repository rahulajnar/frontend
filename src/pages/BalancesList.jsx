import React, { useState } from 'react';
import axios from 'axios';

function BalancesList() {
  const [customerId, setCustomerId] = useState('');
  const [balanceData, setBalanceData] = useState(null);
  const [newBalance, setNewBalance] = useState('');
  const [allBalances, setAllBalances] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const token = localStorage.getItem('token');

  const formatBalance = (balance) =>
    typeof balance === 'number' && !isNaN(balance) ? balance.toFixed(2) : 'Invalid balance';

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return 'Invalid Date';

    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).replace(',', ' at');
  };

  const handleFetchBalance = async () => {
    if (!customerId || isNaN(customerId)) {
      setMessage({ type: 'error', text: 'Please enter a valid Customer ID.' });
      return;
    }

    setLoading(true);
    setMessage(null);
    setBalanceData(null);

    try {
      const res = await axios.get(`http://localhost:5000/api/balances/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBalanceData(res.data.data);
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Error fetching balance',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInsertOrUpdateBalance = async () => {
    if (!customerId || !newBalance || isNaN(newBalance)) {
      setMessage({ type: 'error', text: 'Please enter valid Customer ID and Balance.' });
      return;
    }

    setUpdating(true);
    setMessage(null);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/balances',
        {
          customer_id: parseInt(customerId, 10),
          balance: parseFloat(newBalance),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage({ type: 'success', text: res.data.message });
      setNewBalance('');
      handleFetchBalance();
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Error updating balance.',
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleFetchAllBalances = async () => {
    setLoading(true);
    setMessage(null);
    setAllBalances([]);

    try {
      const res = await axios.get('http://localhost:5000/api/balances', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllBalances(res.data.data || []);
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Error fetching all balances.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <h2 className="text-2xl font-bold mb-4">🏦 Customer Balance Manager</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="number"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="New Balance"
          value={newBalance}
          onChange={(e) => setNewBalance(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleFetchBalance}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Get Balance'}
        </button>
        <button
          onClick={handleInsertOrUpdateBalance}
          disabled={updating}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {updating ? 'Saving...' : 'Save Balance'}
        </button>
        <button
          onClick={handleFetchAllBalances}
          disabled={loading}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Show All Balances'}
        </button>
      </div>

      {message && (
        <p className={`mb-4 ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {message.text}
        </p>
      )}

      {balanceData && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">🔍 Customer Balance</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2">Customer ID</th>
                  <th className="text-right p-2">Balance (₹)</th>
                  <th className="text-left p-2">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">{balanceData.customer_id}</td>
                  <td className="text-right p-2">{formatBalance(balanceData.balance)}</td>
                  <td className="p-2">{formatDate(balanceData.last_updated)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {allBalances.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">📄 All Customer Balances</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2">Customer ID</th>
                  <th className="text-right p-2">Balance (₹)</th>
                  <th className="text-left p-2">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {allBalances.map((entry, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{entry.customer_id}</td>
                    <td className="text-right p-2">{formatBalance(entry.balance)}</td>
                    <td className="p-2">{formatDate(entry.last_updated)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default BalancesList;