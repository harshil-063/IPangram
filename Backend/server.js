const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/auth');
const departmentRouter = require('./routes/departments');
const employeeRouter = require('./routes/employees');
const db = require('./mongoose/mongoose');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/employees', employeeRouter);


// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
