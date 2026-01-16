export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const exportToCsv = (filename: string, data: any[]) => {
  if (data.length === 0) {
    alert("No data to export.");
    return;
  }
  
  const header = Object.keys(data[0]).join(',');
  const rows = data.map(row => Object.values(row).join(','));
  const csvContent = "data:text/csv;charset=utf-8," + [header, ...rows].join('\n');
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  
  link.click();
  document.body.removeChild(link);
};
