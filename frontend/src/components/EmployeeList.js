import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function EmployeesList() {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    location: '',
  });

  const [data, setData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [id, setID] = useState([]);
  console.log(id, 'setID');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  useEffect(() => {
    const getEmployeeData = async () => {
      try {
        const apiUrl = 'http://localhost:3001/api/employees';
        const response = await axios.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    getEmployeeData();
  }, [employeeData, refreshData]);

  useEffect(() => {
    const getEmployeeData = async () => {
      try {
        const apiUrl = 'http://localhost:3001/api/departments';
        const response = await axios.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        setID(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    getEmployeeData();
  }, [employeeData, refreshData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = 'http://localhost:3001/api/employees';

      const response = await axios.post(apiUrl, employeeData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        console.log(response, 'success');
        setEmployeeData({
          name: '',
          location: '',
          department: ''
        });
      }
      setRefreshData(true);
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Create Employee</h2>
        <Link to="/departments" className=" p-2 rounded-md text-blue-500 underline">
          Departments
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
            value={employeeData.name}
            onChange={handleChange}
            className="border p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="location" className="mb-2">
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={employeeData.location}
            onChange={handleChange}
            className="border p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="department" className="mb-2">
            Department ID:
          </label>
          <select
            id="department"
            name="department"
            onChange={handleChange}
            className="border p-2"
          >
            {id.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Create Employee
        </button>
      </form>

      <table className="mt-8 w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Department ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee._id}>
              <td className="border p-2">{employee.name}</td>
              <td className="border p-2">{employee.location}</td>
              <td className="border p-2">{employee.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};