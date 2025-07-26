// src/components/SessionTimer.js
import React, { useState, useEffect } from 'react';

function SessionTimer({ expiryTimestamp }) {
  const [timeLeft, setTimeLeft] = useState(expiryTimestamp - Date.now());

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(expiryTimestamp - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTimestamp, timeLeft]);

  if (timeLeft <= 0) {
    return <p className="text-red-600 font-semibold">⏰ Session expired</p>;
  }

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  const pad = (num) => String(num).padStart(2, '0');

  return (
    <div className="text-sm text-gray-700 font-medium">
      🔒 Auto logout in: <span className="text-blue-600">{pad(minutes)}:{pad(seconds)}</span>
    </div>
  );
}

export default SessionTimer;
