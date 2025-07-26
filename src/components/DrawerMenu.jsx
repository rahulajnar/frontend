import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

function DrawerMenu({ isOpen, onClose }) {
  return (
    <div
      className={`
        fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        bg-white dark:bg-gray-800 w-64
      `}
      id="drawer-navigation"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 
                  rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center 
                  justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        aria-label="Close Drawer"
      >
        <X size={14} />
      </button>

      <h5 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
        Menu
      </h5>

      {/* Navigation List */}
      <div className="py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li>
            <Link to="/" className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Dashboard
            </Link>
          </li>
          {/* Add your banking navigation items here */}
        </ul>
      </div>
    </div>
  );
}

export default DrawerMenu;
