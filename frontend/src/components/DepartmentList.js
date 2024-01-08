import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function DepartmentList() {
  const [departmentData, setDepartmentData] = useState({
    name: '',
    manager: ''
  });

  const [data, setData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData({ ...departmentData, [name]: value });
  }; 

  useEffect(() => {
    const getDepartmentData = async () => {
      try {
        const apiUrl = 'http://localhost:3001/api/departments';
        const response = await axios.get(apiUrl, { 
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        setData(response.data)
      } catch (error) {
        console.error('Error ', error);
      }
    }; 
  
    getDepartmentData();
  }, [departmentData,refreshData]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = 'http://localhost:3001/api/departments';

      const response = await axios.post(apiUrl, departmentData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        console.log(response,'success')
        setDepartmentData({
          name: '',
          manager: ''
        });
      }
      setRefreshData(true)
    } catch (error) {
      console.error('Error creating department:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold mb-4">Create Department</h2>
        <Link to="/employees" className=" p-2 rounded-md text-blue-500 underline">
        Employees
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={departmentData.name}
            onChange={handleChange}
            className="border p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="manager" className="mb-2">
            Manager ID:
          </label>
          <input
            type="text"
            id="manager"
            name="manager"
            value={departmentData.manager}
            onChange={handleChange}
            className="border p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Create Department
        </button>
      </form>

      <table className="mt-8 w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Manager ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((department) => (
            <tr key={department._id}>
              <td className="border p-2">{department.name}</td>
              <td className="border p-2">{department.manager}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



