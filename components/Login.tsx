import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from './shared/Button';
import Input from './shared/Input';

const Login: React.FC = () => {
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(username, password);
    if (!success) {
      setError('Invalid username or password. (Hint: user/password)');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div>
          <h1 className="text-3xl font-extrabold text-center text-primary-600 dark:text-primary-400">
            Family Budget
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <Input
              id="username"
              label="Username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="pt-4">
            <Input
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div>
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
