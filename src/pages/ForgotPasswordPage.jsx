import React, { useState } from 'react';
import axios from 'axios';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/forgot-password', {
        email: email.trim().toLowerCase(),
      });
      setSuccess(res.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email.');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 bg-gray-900 text-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">🔐 Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md"
        >
          Send Reset Link
        </button>
      </form>

      {error && <p className="mt-4 text-red-400">{error}</p>}
      {success && <p className="mt-4 text-green-400">{success}</p>}
    </div>
  );
}

export default ForgotPasswordPage;
