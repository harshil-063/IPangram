import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import DepartmentList from './components/DepartmentList';
import EmployeeList from './components/EmployeeList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/departments" element={<DepartmentList/>} />
        <Route path="/employees" element={<EmployeeList/>} />
      </Routes>
    </Router>
  );
}

export default App;
