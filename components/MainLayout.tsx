import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Categories from './Categories';
import ImportExport from './ImportExport';
import Accounts from './Accounts';
import Transactions from './Transactions';

type View = 'dashboard' | 'transactions' | 'categories' | 'accounts' | 'import-export';

const MainLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      case 'categories':
        return <Categories />;
      case 'accounts':
        return <Accounts />;
      case 'import-export':
        return <ImportExport />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;