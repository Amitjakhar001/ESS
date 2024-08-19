import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">View Data</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Row Name</th>
              <th className="py-2 px-4 border-b">Columns</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="py-2 px-4 border-b">{row.rowName}</td>
                <td className="py-2 px-4 border-b">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="py-1 px-2">Value</th>
                        <th className="py-1 px-2">Type</th>
                        <th className="py-1 px-2">Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      {row.columns.map((col, colIndex) => (
                        <tr key={colIndex}>
                          <td className="py-1 px-2">{col.value}</td>
                          <td className="py-1 px-2">{col.typeOfData}</td>
                          <td className="py-1 px-2">{col.lengthOfData}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}