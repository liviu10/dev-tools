import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ICONS } from '../constants';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div>
        <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>
      </div>
      <button 
        onClick={logout}
        className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
      >
        <span>{ICONS.LOGOUT}</span>
        <span>Logout</span>
      </button>
    </header>
  );
};

export default Header;
