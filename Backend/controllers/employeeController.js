const Employee = require('../models/employee');

async function getAllEmployees(req, res) {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error('Error getting employees:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function createEmployee(req, res) {
  try {
    const { name, location, department } = req.body;
    
    const employee = new Employee({ name, location, department });
    await employee.save();
    
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function updateEmployee(req, res) {
  try {
    const { id } = req.params;
    const { name, location, department } = req.body;

    await Employee.findByIdAndUpdate(id, { name, location, department });
    
    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function deleteEmployee(req, res) {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { getAllEmployees, createEmployee, updateEmployee, deleteEmployee };
