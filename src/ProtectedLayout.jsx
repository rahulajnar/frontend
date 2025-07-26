import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer';
import { useAuth } from './context/AuthContext';

import Sidebar from './components/Sidebar';
import SidebarToggle from './components/SidebarToggle';
import Dashboard from './pages/Dashboard';
import AddCustomerForm from './pages/AddCustomerForm';
import CustomersList from './pages/CustomersList';
import AccountsList from './pages/AccountsList';
import BranchesList from './pages/BranchesList';
import TransactionsList from './pages/TransactionsList';
import LoansList from './pages/LoansList';
import BalancesList from './pages/BalancesList';

function ProtectedLayout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [firstLoad, setFirstLoad] = useState(true);

  // Idle session handling
  useIdleTimer({
    timeout: 15 * 60 * 1000,
    onIdle: () => {
      alert('Session expired. Logging out.');
      logout();
      navigate('/login');
    },
    debounce: 500,
  });

  // Track screen width
  useEffect(() => {
    const handleResize = () => {
      const isWide = window.innerWidth >= 768;
      setSidebarOpen(isWide);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Control animation on first load for desktop
  useEffect(() => {
    if (window.innerWidth >= 768) {
      const timer = setTimeout(() => setFirstLoad(false), 700);
      return () => clearTimeout(timer);
    } else {
      setFirstLoad(false);
    }
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        firstLoad={firstLoad}
      />

      {/* Mobile Backdrop */}
      {sidebarOpen && window.innerWidth < 768 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Toggle Button */}
      <SidebarToggle
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      {/* Main Content */}
      <main className="flex-1 p-4 pt-20 ml-0 md:ml-64 transition-all duration-500 ease-in-out">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-customer" element={<AddCustomerForm />} />
          <Route path="/customers" element={<CustomersList />} />
          <Route path="/accounts" element={<AccountsList />} />
          <Route path="/branches" element={<BranchesList />} />
          <Route path="/transactions" element={<TransactionsList />} />
          <Route path="/loans" element={<LoansList />} />
          <Route path="/balances" element={<BalancesList />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default ProtectedLayout;
