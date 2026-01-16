import React, { useState } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import { api } from '../services/api';
import { exportToCsv } from '../utils/helpers';
import { Transaction } from '../types';

const ImportExport: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
    setIsUploading(true);
    // This is a mock upload. In a real app, you would send the file to the backend.
    setTimeout(() => {
      alert(`File "${selectedFile.name}" uploaded successfully! (Mock)`);
      setSelectedFile(null);
      setIsUploading(false);
    }, 1500);
  };

  const handleExport = async (format: 'csv' | 'excel' | 'pdf') => {
    if (format === 'csv') {
      const transactions: Transaction[] = await api.getTransactions();
      exportToCsv('transactions', transactions);
    } else {
      // In a real app, these would trigger backend processes to generate the files.
      alert(`Exporting to ${format.toUpperCase()} is not implemented in this mock. A real backend would handle this.`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card title="Import Data">
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Upload a CSV, Excel, or PDF file with your transactions. The backend will process it automatically.
          </p>
          <div>
            <label htmlFor="file-upload" className="sr-only">Choose file</label>
            <input 
              id="file-upload" 
              name="file-upload" 
              type="file" 
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .pdf"
              onChange={handleFileChange}
            />
          </div>
          {selectedFile && <p className="text-sm text-gray-500">Selected: {selectedFile.name}</p>}
          <Button onClick={handleUpload} disabled={!selectedFile || isUploading} isLoading={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload File'}
          </Button>
        </div>
      </Card>
      
      <Card title="Export Data">
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Export all your transaction data into your preferred format.
          </p>
          <div className="flex space-x-4">
            <Button variant="secondary" onClick={() => handleExport('csv')}>
              Export to CSV
            </Button>
            <Button variant="secondary" onClick={() => handleExport('excel')}>
              Export to Excel
            </Button>
            <Button variant="secondary" onClick={() => handleExport('pdf')}>
              Export to PDF
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ImportExport;
