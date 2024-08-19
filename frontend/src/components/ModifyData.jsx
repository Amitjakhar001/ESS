import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from 'axios';

export default function ModifyData() {
  const [csvData, setCsvData] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setCsvData(response.data);
      initializeFormData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const initializeFormData = (data) => {
    const initialFormData = {};
    data.forEach(row => {
      initialFormData[row.rowName] = row.columns.map(col => col.value);
    });
    setFormData(initialFormData);
  };

  const handleInputChange = (rowName, index, value) => {
    setFormData(prevData => ({
      ...prevData,
      [rowName]: prevData[rowName].map((v, i) => i === index ? value : v)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const rowName in formData) {
        const columns = csvData.find(row => row.rowName === rowName).columns.map((col, index) => ({
          ...col,
          value: formData[rowName][index]
        }));
        await axios.post('http://localhost:5000/api/data/update', { rowName, columns });
      }
      alert('Data updated successfully');
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Error updating data');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Modify Data</h1>
      <form onSubmit={handleSubmit}>
        {csvData.map((row, rowIndex) => (
          <div key={rowIndex} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{row.rowName}</h2>
            <div className="grid grid-cols-3 gap-4">
              {row.columns.map((col, colIndex) => (
                <div key={colIndex}>
                  <Label htmlFor={`${row.rowName}-${colIndex}`}>{`Column ${colIndex + 1}`}</Label>
                  <Input
                    id={`${row.rowName}-${colIndex}`}
                    value={formData[row.rowName]?.[colIndex] || ''}
                    onChange={(e) => handleInputChange(row.rowName, colIndex, e.target.value)}
                    maxLength={col.lengthOfData}
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