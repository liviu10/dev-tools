import React, { useEffect, useState, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { api } from '../services/api';
import { Transaction, Category, TransactionType, Account } from '../types';
import { formatCurrency } from '../utils/helpers';
import Card from './shared/Card';
import { ICONS } from '../constants';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [transData, catData, accData] = await Promise.all([
          api.getTransactions(),
          api.getCategories(),
          api.getAccounts()
        ]);
        setTransactions(transData);
        setCategories(catData);
        setAccounts(accData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;
    return { totalIncome, totalExpense, balance };
  }, [transactions]);

  const accountBalances = useMemo(() => {
    return accounts.map(account => {
        const accountTransactions = transactions.filter(t => t.accountId === account.id);
        const balance = accountTransactions.reduce((acc, t) => {
            return t.type === TransactionType.INCOME ? acc + t.amount : acc - t.amount;
        }, account.initialBalance);
        return { ...account, balance };
    });
  }, [accounts, transactions]);

  const expenseByCategory = useMemo(() => {
    const expenseData: { [key: string]: number } = {};
    transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .forEach(t => {
        const category = categories.find(c => c.id === t.categoryId);
        if (category) {
          expenseData[category.name] = (expenseData[category.name] || 0) + t.amount;
        }
      });
    return Object.entries(expenseData).map(([name, value]) => ({ name, value }));
  }, [transactions, categories]);

  const incomeVsExpenseData = [
    { name: 'Total', Income: stats.totalIncome, Expense: stats.totalExpense }
  ];

  if (isLoading) {
    return <div className="text-center p-8">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Income" icon={ICONS.INCOME}>
          <p className="text-3xl font-bold text-green-500">{formatCurrency(stats.totalIncome)}</p>
        </Card>
        <Card title="Total Expenses" icon={ICONS.EXPENSE}>
          <p className="text-3xl font-bold text-red-500">{formatCurrency(stats.totalExpense)}</p>
        </Card>
        <Card title="Account Balances" icon={ICONS.ACCOUNTS}>
          <div className="space-y-2">
            {accountBalances.map(account => (
              <div key={account.id} className="flex justify-between items-center">
                <span className="font-medium">{account.name}</span>
                <span className={`font-semibold ${account.balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatCurrency(account.balance)}
                </span>
              </div>
            ))}
            <div className="border-t dark:border-gray-700 mt-2 pt-2 flex justify-between items-center font-bold">
              <span>Total</span>
              <span>{formatCurrency(accountBalances.reduce((sum, acc) => sum + acc.balance, 0))}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Income vs Expenses">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incomeVsExpenseData}>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="Income" fill="#22c55e" />
              <Bar dataKey="Expense" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Expense Breakdown">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {expenseByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
