import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import MainLayout from './components/MainLayout';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return user ? <MainLayout /> : <Login />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <AppContent />
      </div>
    </AuthProvider>
  );
};

export default App;