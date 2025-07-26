import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SessionTimer from '../components/SessionTimer';
import {
  Landmark,
  Home,
  UserPlus,
  Users,
  CreditCard,
  Building,
  Banknote,
  LandmarkIcon,
  Wallet,
  LogOut,
  X,
} from 'lucide-react';

function Sidebar({ isOpen, onClose, firstLoad = false }) {
  const { logout, expiryTimestamp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Responsive width detection
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`
        fixed md:static top-0 left-0 z-40 h-screen w-64 p-4 overflow-y-auto bg-[#2C2F5B] text-white flex flex-col transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${firstLoad && isDesktop ? 'animate-slide-in' : ''}
        shadow-lg md:shadow-none
      `}
    >
      {/* Close button for mobile */}
      {!isDesktop && (
        <div className="flex justify-end">
          <button
            onClick={onClose}
            aria-label="Close Sidebar"
            className="text-white hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
          >
            <X size={24} />
          </button>
        </div>
      )}

      {/* Brand */}
      <div className="flex flex-col items-center mt-4 mb-6">
        <Landmark size={48} />
        <h2 className="text-xl font-semibold mt-2">Bank System</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2">
        <ul className="space-y-3">
          <NavItem to="/" icon={<Home size={20} />} label="Dashboard" currentPath={location.pathname} />
          <NavItem to="/add-customer" icon={<UserPlus size={20} />} label="Add Customer" currentPath={location.pathname} />
          <NavItem to="/customers" icon={<Users size={20} />} label="Customers" currentPath={location.pathname} />
          <NavItem to="/accounts" icon={<CreditCard size={20} />} label="Accounts" currentPath={location.pathname} />
          <NavItem to="/branches" icon={<Building size={20} />} label="Branches" currentPath={location.pathname} />
          <NavItem to="/transactions" icon={<Banknote size={20} />} label="Transactions" currentPath={location.pathname} />
          <NavItem to="/loans" icon={<LandmarkIcon size={20} />} label="Loans" currentPath={location.pathname} />
          <NavItem to="/balances" icon={<Wallet size={20} />} label="Balances" currentPath={location.pathname} />
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 mt-6 pt-4">
        {expiryTimestamp && <SessionTimer expiryTimestamp={expiryTimestamp} />}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 mt-4 text-red-400 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

function NavItem({ to, icon, label, currentPath }) {
  const isActive = currentPath === to;

  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
          ${isActive ? 'bg-white/10 text-orange-400' : 'text-white hover:text-orange-300 hover:bg-white/5'}
        `}
        aria-current={isActive ? 'page' : undefined}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  );
}

export default Sidebar;
