// src/components/SidebarToggle.jsx
import React from 'react';
import { Menu, X } from 'lucide-react';

const SidebarToggle = ({ isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      aria-expanded={isOpen}
      className={`
        fixed top-4 left-4 z-50
        flex items-center justify-center
        w-10 h-10
        bg-gradient-to-br from-blue-500 to-purple-600
        text-white
        rounded-lg
        shadow-md
        hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-blue-300
        transform transition-all duration-200
      `}
    >
      {isOpen
        ? <X size={20} />
        : <Menu size={20} />
      }
    </button>
  );
};

export default SidebarToggle;
