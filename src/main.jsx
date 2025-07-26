// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // ⬅️ This matches your App.jsx
import './index.css';     // ⬅️ Optional: Tailwind or base styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
