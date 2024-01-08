const Department = require('../models/department');

async function getAllDepartments(req, res) {
  try {
    const departments = await Department.find();
    console.log(departments);
    res.json(departments);
  } catch (error) {
    console.error('Error getting departments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function createDepartment(req, res) {
  try {
    const { name, manager } = req.body;
    
    const department = new Department({ name, manager });
    await department.save();
    
    res.status(201).json({ message: 'Department created successfully' });
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function updateDepartment(req, res) {
  try {
    const { id } = req.params;
    const { name, manager } = req.body;

    await Department.findByIdAndUpdate(id, { name, manager });
    
    res.json({ message: 'Department updated successfully' });
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function deleteDepartment(req, res) {
  try {
    const { id } = req.params;
    await Department.findByIdAndDelete(id);
    
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { getAllDepartments, createDepartment, updateDepartment, deleteDepartment };
