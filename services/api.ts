import { User, Transaction, Category, Subcategory, TransactionType, Account } from '../types';

let mockUsers: User[] = [
  { id: '1', username: 'user', name: 'John Doe' },
];

let mockAccounts: Account[] = [
  { id: 'a1', name: 'Main Checking', iban: 'DE89 3704 0044 0532 0130 00', initialBalance: 1000 },
  { id: 'a2', name: 'Savings Account', iban: 'DE89 3704 0044 0532 0130 01', initialBalance: 5000 },
];

let mockCategories: Category[] = [
  { id: 'c1', name: 'Salary', type: TransactionType.INCOME, subcategories: [] },
  { id: 'c2', name: 'Freelance', type: TransactionType.INCOME, subcategories: [] },
  { id: 'c3', name: 'Housing', type: TransactionType.EXPENSE, subcategories: [{id: 'sc1', name: 'Rent'}, {id: 'sc2', name: 'Utilities'}] },
  { id: 'c4', name: 'Food', type: TransactionType.EXPENSE, subcategories: [{id: 'sc3', name: 'Groceries'}, {id: 'sc4', name: 'Restaurants'}] },
  { id: 'c5', name: 'Transport', type: TransactionType.EXPENSE, subcategories: [{id: 'sc5', name: 'Gas'}, {id: 'sc6', name: 'Public Transport'}] },
  { id: 'c6', name: 'Entertainment', type: TransactionType.EXPENSE, subcategories: [] },
];

let mockTransactions: Transaction[] = [
  { id: 't1', date: '2023-10-01T09:00:00Z', description: 'Monthly Salary', amount: 5000, type: TransactionType.INCOME, categoryId: 'c1', accountId: 'a1' },
  { id: 't2', date: '2023-10-01T18:00:00Z', description: 'Rent Payment', amount: 1500, type: TransactionType.EXPENSE, categoryId: 'c3', subcategoryId: 'sc1', accountId: 'a1' },
  { id: 't3', date: '2023-10-02T12:00:00Z', description: 'Grocery Shopping', amount: 250, type: TransactionType.EXPENSE, categoryId: 'c4', subcategoryId: 'sc3', accountId: 'a1' },
  { id: 't4', date: '2023-10-05T08:30:00Z', description: 'Gas fill-up', amount: 60, type: TransactionType.EXPENSE, categoryId: 'c5', subcategoryId: 'sc5', accountId: 'a1' },
  { id: 't5', date: '2023-10-10T15:00:00Z', description: 'Freelance Project A', amount: 750, type: TransactionType.INCOME, categoryId: 'c2', accountId: 'a2' },
  { id: 't6', date: '2023-10-12T20:00:00Z', description: 'Dinner with friends', amount: 120, type: TransactionType.EXPENSE, categoryId: 'c4', subcategoryId: 'sc4', accountId: 'a1' },
  { id: 't7', date: '2023-10-15T10:00:00Z', description: 'Electricity Bill', amount: 80, type: TransactionType.EXPENSE, categoryId: 'c3', subcategoryId: 'sc2', accountId: 'a1' },
];

const simulateDelay = <T,>(data: T, delay = 500): Promise<T> => 
  new Promise(resolve => setTimeout(() => resolve(data), delay));


export const api = {
  login: (username: string, password: string): Promise<User | null> => {
    const user = mockUsers.find(u => u.username === username);
    if (user && password === 'password') { // Mock password check
      return simulateDelay(user);
    }
    return simulateDelay(null);
  },
  
  getTransactions: (): Promise<Transaction[]> => simulateDelay([...mockTransactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())),
  
  addTransaction: (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `t${Date.now()}`,
    };
    mockTransactions.push(newTransaction);
    return simulateDelay(newTransaction);
  },

  updateTransaction: (id: string, updates: Partial<Transaction>): Promise<Transaction | null> => {
    const index = mockTransactions.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTransactions[index] = { ...mockTransactions[index], ...updates };
      return simulateDelay(mockTransactions[index]);
    }
    return simulateDelay(null);
  },

  deleteTransaction: (id: string): Promise<boolean> => {
    const initialLength = mockTransactions.length;
    mockTransactions = mockTransactions.filter(t => t.id !== id);
    return simulateDelay(mockTransactions.length < initialLength);
  },

  getCategories: (): Promise<Category[]> => simulateDelay([...mockCategories]),

  addCategory: (category: Omit<Category, 'id' | 'subcategories'>): Promise<Category> => {
    const newCategory: Category = {
      ...category,
      id: `c${Date.now()}`,
      subcategories: [],
    };
    mockCategories.push(newCategory);
    return simulateDelay(newCategory);
  },

  updateCategory: (id: string, updates: Partial<Category>): Promise<Category | null> => {
    const index = mockCategories.findIndex(c => c.id === id);
    if (index !== -1) {
      mockCategories[index] = { ...mockCategories[index], ...updates };
      return simulateDelay(mockCategories[index]);
    }
    return simulateDelay(null);
  },

  deleteCategory: (id: string): Promise<boolean> => {
    const initialLength = mockCategories.length;
    mockCategories = mockCategories.filter(c => c.id !== id);
    // Also delete associated transactions for mock simplicity
    mockTransactions = mockTransactions.filter(t => t.categoryId !== id);
    return simulateDelay(mockCategories.length < initialLength);
  },

  addSubcategory: (categoryId: string, subcategoryName: string): Promise<Subcategory | null> => {
    const category = mockCategories.find(c => c.id === categoryId);
    if (category) {
      const newSubcategory: Subcategory = {
        id: `sc${Date.now()}`,
        name: subcategoryName,
      };
      category.subcategories.push(newSubcategory);
      return simulateDelay(newSubcategory);
    }
    return simulateDelay(null);
  },

  updateSubcategory: (categoryId: string, subcategoryId: string, newName: string): Promise<Subcategory | null> => {
    const category = mockCategories.find(c => c.id === categoryId);
    if (category) {
      const subcategory = category.subcategories.find(sc => sc.id === subcategoryId);
      if (subcategory) {
        subcategory.name = newName;
        return simulateDelay(subcategory);
      }
    }
    return simulateDelay(null);
  },

  deleteSubcategory: (categoryId: string, subcategoryId: string): Promise<boolean> => {
    const category = mockCategories.find(c => c.id === categoryId);
    if (category) {
      const initialLength = category.subcategories.length;
      category.subcategories = category.subcategories.filter(sc => sc.id !== subcategoryId);
      return simulateDelay(category.subcategories.length < initialLength);
    }
    return simulateDelay(false);
  },

  getAccounts: (): Promise<Account[]> => simulateDelay([...mockAccounts]),

  addAccount: (account: Omit<Account, 'id'>): Promise<Account> => {
    const newAccount: Account = {
      ...account,
      id: `a${Date.now()}`,
    };
    mockAccounts.push(newAccount);
    return simulateDelay(newAccount);
  },

  updateAccount: (id: string, updates: Partial<Omit<Account, 'id' | 'initialBalance'>>): Promise<Account | null> => {
    const index = mockAccounts.findIndex(a => a.id === id);
    if (index !== -1) {
      mockAccounts[index] = { ...mockAccounts[index], ...updates };
      return simulateDelay(mockAccounts[index]);
    }
    return simulateDelay(null);
  },

  deleteAccount: (id: string): Promise<boolean> => {
    const initialLength = mockAccounts.length;
    mockAccounts = mockAccounts.filter(a => a.id !== id);
    mockTransactions = mockTransactions.filter(t => t.accountId !== id);
    return simulateDelay(mockAccounts.length < initialLength);
  }
};