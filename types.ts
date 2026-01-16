export interface Account {
  id: string;
  name: string;
  iban: string;
  initialBalance: number;
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  subcategories: Subcategory[];
}

export interface Transaction {
  id:string;
  date: string; // ISO string format
  description: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  subcategoryId?: string;
  accountId: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
}
