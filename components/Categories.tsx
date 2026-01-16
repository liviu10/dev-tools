import React, { useState, useEffect, useCallback } from 'react';
import { Category, Subcategory, TransactionType } from '../types';
import { api } from '../services/api';
import Button from './shared/Button';
import Modal from './shared/Modal';
import Input from './shared/Input';
import { ICONS } from '../constants';

type ModalState = {
  isOpen: boolean;
  type: 'category' | 'subcategory';
  mode: 'add' | 'edit' | 'delete';
  data?: Category | Subcategory;
  parentCategory?: Category;
};

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, type: 'category', mode: 'add' });
  const [formData, setFormData] = useState<{ id?: string; name: string; type: TransactionType, parentId?: string }>({ name: '', type: TransactionType.EXPENSE });
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const catData = await api.getCategories();
      setCategories(catData);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const openModal = (type: 'category' | 'subcategory', mode: 'add' | 'edit' | 'delete', data?: Category | Subcategory, parentCategory?: Category) => {
    setModalState({ isOpen: true, type, mode, data, parentCategory });
    if (mode === 'add' && type === 'subcategory') {
        setFormData({ name: '', type: TransactionType.EXPENSE, parentId: parentCategory?.id });
    } else if (data) {
        setFormData({ id: data.id, name: data.name, type: (data as Category).type || TransactionType.EXPENSE, parentId: parentCategory?.id });
    } else {
        setFormData({ name: '', type: TransactionType.EXPENSE });
    }
  };

  const closeModal = () => setModalState({ isOpen: false, type: 'category', mode: 'add' });

  const handleFormSubmit = async () => {
    const { type, mode } = modalState;
    if (mode === 'add') {
      if (type === 'category') {
        await api.addCategory({ name: formData.name, type: formData.type });
      } else if (formData.parentId) {
        await api.addSubcategory(formData.parentId, formData.name);
      }
    } else if (mode === 'edit' && formData.id) {
      if (type === 'category') {
        await api.updateCategory(formData.id, { name: formData.name, type: formData.type });
      } else if (modalState.parentCategory?.id) {
        await api.updateSubcategory(modalState.parentCategory.id, formData.id, formData.name);
      }
    } else if (mode === 'delete' && modalState.data) {
       if (type === 'category') {
        await api.deleteCategory(modalState.data.id);
      } else if (modalState.parentCategory?.id) {
        await api.deleteSubcategory(modalState.parentCategory.id, modalState.data.id);
      }
    }
    fetchCategories();
    closeModal();
  };

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const renderModalContent = () => {
    if (modalState.mode === 'delete') {
      return (
        <div>
          <p>Are you sure you want to delete "{modalState.data?.name}"?</p>
          <div className="flex justify-end space-x-4 mt-4">
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button variant="danger" onClick={handleFormSubmit}>Delete</Button>
          </div>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        <Input label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        {modalState.type === 'category' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as TransactionType })}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700"
            >
              <option value={TransactionType.INCOME}>Income</option>
              <option value={TransactionType.EXPENSE}>Expense</option>
            </select>
          </div>
        )}
        <div className="flex justify-end space-x-4">
          <Button variant="secondary" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleFormSubmit}>Save</Button>
        </div>
      </div>
    );
  };
  
  if (isLoading) return <div>Loading categories...</div>;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Categories</h2>
        <Button onClick={() => openModal('category', 'add')}>
          {ICONS.PLUS} Add Category
        </Button>
      </div>
      <div className="space-y-2">
        {categories.map(cat => (
          <div key={cat.id} className="border dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center space-x-3">
                 <button onClick={() => toggleExpand(cat.id)} className={`transition-transform duration-200 ${expandedCategories.has(cat.id) ? 'rotate-180' : ''}`}>
                    {ICONS.CHEVRON_DOWN}
                </button>
                <span className="font-semibold">{cat.name}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${cat.type === TransactionType.INCOME ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {cat.type}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                 <Button variant="secondary" size="sm" onClick={() => openModal('subcategory', 'add', undefined, cat)}>Add Sub</Button>
                <button onClick={() => openModal('category', 'edit', cat)} className="p-1 text-gray-500 hover:text-primary-500">{ICONS.EDIT}</button>
                <button onClick={() => openModal('category', 'delete', cat)} className="p-1 text-gray-500 hover:text-red-500">{ICONS.TRASH}</button>
              </div>
            </div>
            {expandedCategories.has(cat.id) && (
              <div className="p-3 pl-12">
                {cat.subcategories.length > 0 ? (
                  <ul className="space-y-2">
                    {cat.subcategories.map(sub => (
                      <li key={sub.id} className="flex justify-between items-center">
                        <span>{sub.name}</span>
                        <div className="flex items-center space-x-2">
                          <button onClick={() => openModal('subcategory', 'edit', sub, cat)} className="p-1 text-gray-500 hover:text-primary-500">{ICONS.EDIT}</button>
                          <button onClick={() => openModal('subcategory', 'delete', sub, cat)} className="p-1 text-gray-500 hover:text-red-500">{ICONS.TRASH}</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-gray-500 text-sm">No subcategories yet.</p>}
              </div>
            )}
          </div>
        ))}
      </div>
      <Modal isOpen={modalState.isOpen} onClose={closeModal} title={`${modalState.mode.charAt(0).toUpperCase() + modalState.mode.slice(1)} ${modalState.type}`}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default Categories;
