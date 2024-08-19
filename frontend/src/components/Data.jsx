import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Papa from 'papaparse';

export default function Data() {
  const [csvData, setCsvData] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Load and parse the CSV file
    fetch('/info.csv')
      .then(response => response.text())
      .then(csvText => {
        const result = Papa.parse(csvText, { header: true });
        setCsvData(result.data);
        
        // Initialize form data
        const initialFormData = {};
        result.data.forEach(row => {
          initialFormData[row.Toolname] = Array(parseInt(row['No.of column'])).fill('');
        });
        setFormData(initialFormData);
      });
  }, []);

  const handleInputChange = (toolname, index, value) => {
    setFormData(prevData => ({
      ...prevData,
      [toolname]: prevData[toolname].map((v, i) => i === index ? value : v)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare data for CSV
    const newData = csvData.flatMap(row => 
      formData[row.Toolname].map((value, index) => ({
        Toolname: row.Toolname,
        ColumnIndex: index + 1,
        Value: value
      }))
    );

    // Get existing data from localStorage
    const existingData = JSON.parse(localStorage.getItem('userdata') || '[]');

    // Append new data
    const updatedData = [...existingData, ...newData];

    // Save updated data to localStorage
    localStorage.setItem('userdata', JSON.stringify(updatedData));

    // Convert to CSV
    const csv = Papa.unparse(updatedData);

    // Create a Blob and download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'userdata.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    console.log('Form submitted and data appended to userdata.csv');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Modify Data</h1>
      <form onSubmit={handleSubmit}>
        {csvData.map((row, rowIndex) => (
          <div key={rowIndex} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{row.Toolname}</h2>
            <div className="grid grid-cols-3 gap-4">
              {Array(parseInt(row['No.of column'])).fill().map((_, colIndex) => (
                <div key={colIndex}>
                  <Label htmlFor={`${row.Toolname}-${colIndex}`}>{`Column ${colIndex + 1}`}</Label>
                  <Input
                    id={`${row.Toolname}-${colIndex}`}
                    value={formData[row.Toolname]?.[colIndex] || ''}
                    onChange={(e) => handleInputChange(row.Toolname, colIndex, e.target.value)}
                    maxLength={parseInt(row['length of data'])}
                    className="mt-1"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <Button type="submit" className="mt-4">Submit</Button>
      </form>
    </div>
  );
}