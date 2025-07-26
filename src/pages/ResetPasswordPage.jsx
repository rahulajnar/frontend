import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPasswordPage() {
  const { token } = useParams(); // ✅ Extract token from URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setMessage('');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/reset-password/${token}`, {
        newPassword,
      });

      setMessage(res.data.message);
      setError('');

      // Optionally redirect after 2 seconds
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage('');
      setError(err.response?.data?.message || 'Failed to reset password.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 bg-gray-900 text-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">🔐 Reset Your Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md"
        >
          Reset Password
        </button>
      </form>

      {error && <p className="mt-4 text-red-400">{error}</p>}
      {message && <p className="mt-4 text-green-400">{message}</p>}
    </div>
  );
}

export default ResetPasswordPage;
