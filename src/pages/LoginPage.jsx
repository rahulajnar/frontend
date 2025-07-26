import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock } from 'lucide-react';

function LoginPage() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        console.log('🔍 Sending login request with:', formData);

        const res = await axios.post('http://localhost:5000/api/login', formData);

        console.log('✅ Login response:', res.data);

        const token = res.data.token;

        if (token) {
            login(token);
            navigate('/');
        } else {
            setError('Login failed. No token received.');
        }
    } catch (err) {
        console.error('❌ Login error:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
        setLoading(false);
    }
};


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#3a1c71] via-[#d76d77] to-[#ffaf7b]">
            <div className="bg-white/20 backdrop-blur-lg p-10 rounded-3xl shadow-xl w-[90%] max-w-sm transition duration-500 ease-in-out transform hover:scale-[1.01] animate-fade-in">
                <div className="flex justify-center -mt-16 mb-6">
                    <div className="bg-[#1d2c4d] rounded-full p-4 shadow-md">
                        <User className="text-white" size={36} />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Username */}
                    <div className="flex items-center bg-white/30 px-4 py-2 rounded-md shadow-sm transition focus-within:ring-2 ring-white">
                        <User className="text-[#1d2c4d]" size={18} />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="bg-transparent border-none focus:outline-none ml-3 w-full text-white placeholder-white"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="flex items-center bg-white/30 px-4 py-2 rounded-md shadow-sm transition focus-within:ring-2 ring-white">
                        <Lock className="text-[#1d2c4d]" size={18} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="bg-transparent border-none focus:outline-none ml-3 w-full text-white placeholder-white"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Forgot Password */}
                    <button
                        type="button"
                        onClick={() => navigate('/forgot-password')}
                        className="text-blue-300 hover:underline"
                    >
                        Forgot Password?
                    </button>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white/30 hover:bg-white/40 text-white py-2 rounded-full font-semibold transition-colors duration-300"
                    >
                        {loading ? 'Logging in...' : 'LOGIN'}
                    </button>
                </form>

                {error && <p className="mt-4 text-red-200 text-sm text-center">{error}</p>}
            </div>
        </div>
    );
}

export default LoginPage;
