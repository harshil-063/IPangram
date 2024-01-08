const express = require('express');
const departmentRouter = express.Router();
const departmentController = require('../controllers/departmentController');
const authMiddleware = require('../middleware/auth');

departmentRouter.use(authMiddleware.authenticateToken);

departmentRouter.get('/', departmentController.getAllDepartments);
departmentRouter.post('/', departmentController.createDepartment);
departmentRouter.put('/:id', departmentController.updateDepartment);
departmentRouter.delete('/:id', departmentController.deleteDepartment);

module.exports = departmentRouter;
