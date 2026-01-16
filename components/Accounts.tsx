import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Account, Transaction, TransactionType } from '../types';
import { api } from '../services/api';
import Button from './shared/Button';
import Modal from './shared/Modal';
import Input from './shared/Input';
import { ICONS } from '../constants';
import { formatCurrency } from '../utils/helpers';

type ModalState = {
  isOpen: boolean;
  mode: 'add' | 'edit' | 'delete';
  data?: Account;
};

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, mode: 'add' });
  const [formData, setFormData] = useState<{ id?: string; name: string; iban: string; initialBalance: number }>({ name: '', iban: '', initialBalance: 0 });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [accData, transData] = await Promise.all([
        api.getAccounts(),
        api.getTransactions()
      ]);
      setAccounts(accData);
      setTransactions(transData);
    } catch (error) {
      console.error("Failed to fetch accounts data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const accountBalances = useMemo(() => {
    return accounts.map(account => {
        const accountTransactions = transactions.filter(t => t.accountId === account.id);
        const balance = accountTransactions.reduce((acc, t) => {
            return t.type === TransactionType.INCOME ? acc + t.amount : acc - t.amount;
        }, account.initialBalance);
        return { ...account, balance };
    });
  }, [accounts, transactions]);

  const openModal = (mode: 'add' | 'edit' | 'delete', data?: Account) => {
    setModalState({ isOpen: true, mode, data });
    if (data) {
      setFormData({ id: data.id, name: data.name, iban: data.iban, initialBalance: data.initialBalance });
    } else {
      setFormData({ name: '', iban: '', initialBalance: 0 });
    }
  };

  const closeModal = () => setModalState({ isOpen: false, mode: 'add' });

  const handleFormSubmit = async () => {
    const { mode } = modalState;
    if (!formData.name || !formData.iban) {
        alert("Account Name and IBAN are required.");
        return;
    }
    if (mode === 'add') {
      await api.addAccount({ name: formData.name, iban: formData.iban, initialBalance: formData.initialBalance });
    } else if (mode === 'edit' && formData.id) {
      await api.updateAccount(formData.id, { name: formData.name, iban: formData.iban });
    } else if (mode === 'delete' && modalState.data) {
      await api.deleteAccount(modalState.data.id);
    }
    fetchData();
    closeModal();
  };

  const renderModalContent = () => {
    if (modalState.mode === 'delete') {
      return (
        <div>
          <p>Are you sure you want to delete account "{modalState.data?.name}"? All associated transactions will also be deleted.</p>
          <div className="flex justify-end space-x-4 mt-4">
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button variant="danger" onClick={handleFormSubmit}>Delete</Button>
          </div>
        </div>
      );
    }
    return (
      <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }} className="space-y-4">
        <Input label="Account Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <Input label="IBAN" value={formData.iban} onChange={(e) => setFormData({ ...formData, iban: e.target.value })} required />
        {modalState.mode === 'add' && (
          <Input label="Initial Balance" type="number" step="0.01" value={formData.initialBalance} onChange={(e) => setFormData({ ...formData, initialBalance: parseFloat(e.target.value) || 0 })} required />
        )}
        <div className="flex justify-end space-x-4">
          <Button variant="secondary" type="button" onClick={closeModal}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    );
  };

  if (isLoading) return <div className="text-center p-8">Loading accounts...</div>;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Accounts</h2>
        <Button onClick={() => openModal('add')}>
          {ICONS.PLUS} Add Account
        </Button>
      </div>
      <div className="space-y-3">
        {accountBalances.map(acc => (
          <div key={acc.id} className="border dark:border-gray-700 rounded-lg p-4 flex justify-between items-center transition-shadow hover:shadow-lg">
            <div>
              <p className="font-semibold text-lg">{acc.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{acc.iban}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`font-semibold text-lg ${acc.balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>{formatCurrency(acc.balance)}</span>
              <div className="flex items-center space-x-1">
                <button onClick={() => openModal('edit', acc)} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-500">{ICONS.EDIT}</button>
                <button onClick={() => openModal('delete', acc)} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500">{ICONS.TRASH}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={modalState.isOpen} onClose={closeModal} title={`${modalState.mode.charAt(0).toUpperCase() + modalState.mode.slice(1)} Account`}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default Accounts;
