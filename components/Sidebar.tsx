import React from 'react';
import { ICONS } from '../constants';

type View = 'dashboard' | 'transactions' | 'categories' | 'accounts' | 'import-export';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  const activeClass = 'bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-300';
  const inactiveClass = 'hover:bg-gray-200 dark:hover:bg-gray-700';

  return (
    <li
      onClick={onClick}
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${isActive ? activeClass : inactiveClass}`}
    >
      <span className="w-6 h-6">{icon}</span>
      <span className="font-medium">{label}</span>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 p-4 border-r dark:border-gray-700 hidden md:block">
      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-8">
        Family Budget
      </div>
      <nav>
        <ul>
          <NavItem 
            icon={ICONS.DASHBOARD}
            label="Dashboard"
            isActive={currentView === 'dashboard'}
            onClick={() => setCurrentView('dashboard')}
          />
           <NavItem 
            icon={ICONS.TRANSACTIONS}
            label="Transactions"
            isActive={currentView === 'transactions'}
            onClick={() => setCurrentView('transactions')}
          />
          <NavItem 
            icon={ICONS.CATEGORIES}
            label="Categories"
            isActive={currentView === 'categories'}
            onClick={() => setCurrentView('categories')}
          />
          <NavItem 
            icon={ICONS.ACCOUNTS}
            label="Accounts"
            isActive={currentView === 'accounts'}
            onClick={() => setCurrentView('accounts')}
          />
          <NavItem 
            icon={ICONS.IMPORT_EXPORT}
            label="Import / Export"
            isActive={currentView === 'import-export'}
            onClick={() => setCurrentView('import-export')}
          />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;