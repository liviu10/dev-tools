import React, { useState, useMemo, useEffect } from 'react';
import CheatSheetLayout from './CheatSheetLayout';
import CheatSheetSection from './ui/CheatSheetSection';

// FIX: The original `CheatSheetItem` type was too specific to HTML categories.
// This generic definition allows `category` to be any string and includes an optional `version` property,
// making it compatible with all the different cheat sheet data types used in `App.tsx`.
export interface CheatSheetItem {
  name: string;
  description: string;
  example: string;
  category: string;
  version?: string;
}

export interface SheetInfo {
    name: string;
    data: CheatSheetItem[];
    orderedCategories?: string[];
    versionPrefix?: string;
    searchPlaceholder?: string;
}

interface CheatSheetPageProps {
    title: string;
    sheets: SheetInfo[];
}

const CheatSheetPage: React.FC<CheatSheetPageProps> = ({ title, sheets }) => {
    const [activeSheetName, setActiveSheetName] = useState(sheets[0].name);

    const activeSheet = useMemo(() => sheets.find(s => s.name === activeSheetName) || sheets[0], [sheets, activeSheetName]);

    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setActiveCategory('All');
        setSearchQuery('');
    }, [activeSheetName]);

    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(activeSheet.data.map(item => item.category))];
        const ordered = activeSheet.orderedCategories;
        if (ordered) {
            const sorted = uniqueCategories.sort((a, b) => {
                const indexA = ordered.indexOf(a as never);
                const indexB = ordered.indexOf(b as never);
                if (indexA === -1) return 1;
                if (indexB === -1) return -1;
                return indexA - indexB;
            });
            return ['All', ...sorted];
        }
        return ['All', ...uniqueCategories.sort()];
    }, [activeSheet]);

    const filteredItems = useMemo(() => {
        let items: CheatSheetItem[];
        if (activeCategory === 'All') {
            items = activeSheet.data;
        } else {
            items = activeSheet.data.filter(item => item.category === activeCategory);
        }

        if (searchQuery.trim() !== '') {
            const lowercasedQuery = searchQuery.toLowerCase();
            items = items.filter(item =>
                item.name.toLowerCase().includes(lowercasedQuery) ||
                item.description.toLowerCase().includes(lowercasedQuery)
            );
        }

        if (categories.length <= 2 && activeCategory === 'All') {
            return [...items].sort((a, b) => a.name.localeCompare(b.name));
        }

        return items;
    }, [activeCategory, searchQuery, activeSheet, categories]);
    
    const sheetTabs = useMemo(() => sheets.map(s => ({ value: s.name, label: s.name })), [sheets]);

    const showCategoryTabs = categories.length > 2;

    return (
        <CheatSheetLayout
            title={title}
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            searchPlaceholder={activeSheet.searchPlaceholder || `Search in ${activeSheet.name}...`}
            activeTab={activeCategory}
            onTabChange={setActiveCategory}
            categories={showCategoryTabs ? categories : []}
            sheetTabs={sheets.length > 1 ? sheetTabs : undefined}
            activeSheetTab={activeSheetName}
            onSheetTabChange={setActiveSheetName}
        >
            <CheatSheetSection items={filteredItems} versionPrefix={activeSheet.versionPrefix} />
        </CheatSheetLayout>
    );
};

export default CheatSheetPage;
