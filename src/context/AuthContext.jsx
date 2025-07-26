// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
    const [expiryTimestamp, setExpiryTimestamp] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const decoded = jwtDecode(storedToken);
            const expiryTime = decoded?.exp * 1000;
            const now = Date.now();

            if (expiryTime && expiryTime > now) {
                setToken(storedToken);
                setIsAuthenticated(true);
                setExpiryTimestamp(expiryTime);
                scheduleLogout(expiryTime - now);
            } else {
                logout();
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const scheduleLogout = (timeout) => {
        setTimeout(() => {
            alert('🔒 Session expired. You have been logged out.');
            logout();
            window.location.href = '/login';
        }, timeout);
    };

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
        setIsAuthenticated(true);

        const decoded = jwtDecode(newToken);
        const expiryTime = decoded?.exp * 1000;
        const now = Date.now();

        if (expiryTime && expiryTime > now) {
            setExpiryTimestamp(expiryTime);
            scheduleLogout(expiryTime - now);
        }
    };

    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setExpiryTimestamp(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated, expiryTimestamp }}>
            {isAuthenticated === null ? <LoadingScreen /> : children}
        </AuthContext.Provider>
    );
}

function LoadingScreen() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <h2>Loading...</h2>
        </div>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
