import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Transaction, Category, Account, Subcategory, TransactionType } from '../types';
import { api } from '../services/api';
import Button from './shared/Button';
import Modal from './shared/Modal';
import Input from './shared/Input';
import { ICONS } from '../constants';
import { formatCurrency } from '../utils/helpers';
import Pagination from './shared/Pagination';

type ModalState = {
  isOpen: boolean;
  mode: 'add' | 'edit' | 'delete';
  data?: Transaction;
};

type SortDirection = 'ascending' | 'descending';
type SortableColumn = keyof Transaction | 'category' | 'account';
type SortConfig = {
  key: SortableColumn | null;
  direction: SortDirection;
};

const emptyForm: Omit<Transaction, 'id'> = {
  date: new Date().toISOString().substring(0, 10),
  description: '',
  amount: 0,
  type: TransactionType.EXPENSE,
  categoryId: '',
  subcategoryId: undefined,
  accountId: '',
};

const initialFilters = {
  startDate: '',
  endDate: '',
  type: 'all',
  categoryId: 'all',
  accountId: 'all',
};

const ITEMS_PER_PAGE = 10;

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, mode: 'add' });
  const [formData, setFormData] = useState<Omit<Transaction, 'id'> & {id?: string}>(emptyForm);
  const [filters, setFilters] = useState(initialFilters);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'date', direction: 'descending' });
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [transData, catData, accData] = await Promise.all([
        api.getTransactions(),
        api.getCategories(),
        api.getAccounts(),
      ]);
      setTransactions(transData);
      setCategories(catData);
      setAccounts(accData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortConfig]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };

    if (name === 'type') {
      const selectedCategory = categories.find(c => c.id === filters.categoryId);
      if (selectedCategory && value !== 'all' && selectedCategory.type !== value) {
        newFilters.categoryId = 'all';
      }
    }
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      if (startDate) {
        startDate.setHours(0, 0, 0, 0);
        if (transactionDate < startDate) return false;
      }
      if (endDate) {
        endDate.setHours(23, 59, 59, 999);
        if (transactionDate > endDate) return false;
      }

      if (filters.type !== 'all' && t.type !== filters.type) return false;
      if (filters.categoryId !== 'all' && t.categoryId !== filters.categoryId) return false;
      if (filters.accountId !== 'all' && t.accountId !== filters.accountId) return false;
      
      return true;
    });
  }, [transactions, filters]);

  const sortedTransactions = useMemo(() => {
    const sortableItems = [...filteredTransactions];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue, bValue;
        
        const getCategoryInfo = (t: Transaction): string => {
            const cat = categories.find(c => c.id === t.categoryId);
            if (!cat) return 'N/A';
            const sub = cat.subcategories.find(s => s.id === t.subcategoryId);
            return sub ? `${cat.name} / ${sub.name}` : cat.name;
        }
        const getAccountName = (accountId: string): string => {
            return accounts.find(a => a.id === accountId)?.name || 'N/A';
        }

        if (sortConfig.key === 'category') {
          aValue = getCategoryInfo(a);
          bValue = getCategoryInfo(b);
        } else if (sortConfig.key === 'account') {
          aValue = getAccountName(a.accountId);
          bValue = getAccountName(b.accountId);
        } else {
          aValue = a[sortConfig.key as keyof Transaction];
          bValue = b[sortConfig.key as keyof Transaction];
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredTransactions, sortConfig, categories, accounts]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedTransactions, currentPage]);

  const totalPages = Math.ceil(sortedTransactions.length / ITEMS_PER_PAGE);

  const handleSort = (key: SortableColumn) => {
    let direction: SortDirection = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const categoriesForFilter = useMemo(() => {
    if (filters.type === 'all') return categories;
    return categories.filter(c => c.type === filters.type);
  }, [categories, filters.type]);

  const openModal = (mode: 'add' | 'edit' | 'delete', data?: Transaction) => {
    setModalState({ isOpen: true, mode, data });
    if (mode === 'add') {
      const defaultAccount = accounts.length > 0 ? accounts[0].id : '';
      const defaultCategory = categories.find(c => c.type === TransactionType.EXPENSE);
      setFormData({ ...emptyForm, accountId: defaultAccount, categoryId: defaultCategory?.id || '' });
    } else if (data) {
      setFormData({ ...data, date: data.date.substring(0, 10) });
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, mode: 'add' });
    setFormData(emptyForm);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    
    if (name === 'type') {
        newFormData.categoryId = '';
        newFormData.subcategoryId = undefined;
    }
    if (name === 'categoryId') {
        newFormData.subcategoryId = undefined;
    }

    setFormData(newFormData);
  };
  
  const handleFormSubmit = async () => {
    const { mode } = modalState;
    const dataToSave = {
        ...formData,
        amount: Number(formData.amount),
        date: new Date(formData.date).toISOString(),
    };

    if (mode === 'add') {
      await api.addTransaction(dataToSave);
    } else if (mode === 'edit' && formData.id) {
      await api.updateTransaction(formData.id, dataToSave);
    } else if (mode === 'delete' && modalState.data) {
      await api.deleteTransaction(modalState.data.id);
    }
    fetchData();
    closeModal();
  };

  const renderModalContent = () => {
    if (modalState.mode === 'delete') {
      return (
        <div>
          <p>Are you sure you want to delete this transaction?</p>
          <div className="flex justify-end space-x-4 mt-4">
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button variant="danger" onClick={handleFormSubmit}>Delete</Button>
          </div>
        </div>
      );
    }

    const filteredCategories = categories.filter(c => c.type === formData.type);
    const selectedCategory = categories.find(c => c.id === formData.categoryId);

    return (
      <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Date" type="date" name="date" value={formData.date} onChange={handleFormChange} required />
          <Input label="Amount" type="number" name="amount" step="0.01" value={formData.amount} onChange={handleFormChange} required />
        </div>
        <Input label="Description" name="description" value={formData.description} onChange={handleFormChange} required />
         <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
          <select name="type" value={formData.type} onChange={handleFormChange} className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700">
            <option value={TransactionType.EXPENSE}>Expense</option>
            <option value={TransactionType.INCOME}>Income</option>
          </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account</label>
            <select name="accountId" value={formData.accountId} onChange={handleFormChange} required className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700">
                <option value="">Select Account</option>
                {accounts.map(acc => <option key={acc.id} value={acc.id}>{acc.name}</option>)}
            </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select name="categoryId" value={formData.categoryId} onChange={handleFormChange} required className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700">
              <option value="">Select Category</option>
              {filteredCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
          {selectedCategory && selectedCategory.subcategories.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subcategory</label>
              <select name="subcategoryId" value={formData.subcategoryId} onChange={handleFormChange} className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700">
                <option value="">Select Subcategory</option>
                {selectedCategory.subcategories.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
              </select>
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <Button variant="secondary" type="button" onClick={closeModal}>Cancel</Button>
          <Button type="submit">Save Transaction</Button>
        </div>
      </form>
    );
  };
  
  if (isLoading) return <div className="text-center p-8">Loading transactions...</div>;

  const getCategoryInfo = (t: Transaction): string => {
      const cat = categories.find(c => c.id === t.categoryId);
      if (!cat) return 'N/A';
      const sub = cat.subcategories.find(s => s.id === t.subcategoryId);
      return sub ? `${cat.name} / ${sub.name}` : cat.name;
  }
  
  const getAccountName = (accountId: string): string => {
      return accounts.find(a => a.id === accountId)?.name || 'N/A';
  }
  
  const SortableHeader: React.FC<{ columnKey: SortableColumn, title: string }> = ({ columnKey, title }) => (
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
        <button onClick={() => handleSort(columnKey)} className="flex items-center space-x-1 group">
            <span>{title}</span>
            <span className={`transition-opacity ${sortConfig.key === columnKey ? 'opacity-100' : 'opacity-20 group-hover:opacity-100'}`}>
                {sortConfig.key === columnKey && sortConfig.direction === 'ascending' ? ICONS.ARROW_UP : ICONS.ARROW_DOWN}
            </span>
        </button>
    </th>
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Transactions</h2>
        <Button onClick={() => openModal('add')}>
          {ICONS.PLUS} Add Transaction
        </Button>
      </div>

      <div className="p-4 border dark:border-gray-700 rounded-lg mb-4 bg-gray-50 dark:bg-gray-700/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-end">
            <Input label="Start Date" type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
            <Input label="End Date" type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <select name="type" value={filters.type} onChange={handleFilterChange} className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700">
                    <option value="all">All Types</option>
                    <option value={TransactionType.EXPENSE}>Expense</option>
                    <option value={TransactionType.INCOME}>Income</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select name="categoryId" value={filters.categoryId} onChange={handleFilterChange} className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700">
                    <option value="all">All Categories</option>
                    {categoriesForFilter.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account</label>
                <select name="accountId" value={filters.accountId} onChange={handleFilterChange} className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700">
                    <option value="all">All Accounts</option>
                    {accounts.map(acc => <option key={acc.id} value={acc.id}>{acc.name}</option>)}
                </select>
            </div>
            <Button variant="secondary" onClick={resetFilters} className="w-full">
                Clear
            </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <SortableHeader columnKey="date" title="Date" />
              <SortableHeader columnKey="description" title="Description" />
              <SortableHeader columnKey="category" title="Category" />
              <SortableHeader columnKey="account" title="Account" />
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <button onClick={() => handleSort('amount')} className="flex items-center space-x-1 group w-full justify-end">
                    <span>Amount</span>
                    <span className={`transition-opacity ${sortConfig.key === 'amount' ? 'opacity-100' : 'opacity-20 group-hover:opacity-100'}`}>
                        {sortConfig.key === 'amount' && sortConfig.direction === 'ascending' ? ICONS.ARROW_UP : ICONS.ARROW_DOWN}
                    </span>
                </button>
              </th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map(t => (
                <tr key={t.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(t.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{t.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{getCategoryInfo(t)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{getAccountName(t.accountId)}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-semibold ${t.type === TransactionType.INCOME ? 'text-green-500' : 'text-red-500'}`}>
                      {t.type === TransactionType.INCOME ? '+' : '-'} {formatCurrency(t.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => openModal('edit', t)} className="p-1 text-gray-500 hover:text-primary-500">{ICONS.EDIT}</button>
                      <button onClick={() => openModal('delete', t)} className="p-1 text-gray-500 hover:text-red-500">{ICONS.TRASH}</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                  {transactions.length === 0 ? "No transactions have been added yet." : "No transactions match the current filters."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={sortedTransactions.length}
      />

      <Modal isOpen={modalState.isOpen} onClose={closeModal} title={`${modalState.mode.charAt(0).toUpperCase() + modalState.mode.slice(1)} Transaction`}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default Transactions;
