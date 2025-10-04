const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const cors = require('cors');
const EmployeeRoutes = require('./Routes/EmployeeRoutes');
const PORT = process.env.PORT || 8080;

require('./Models/db');

// Create uploads directory
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors());
app.use(bodyParser.json());

// Serve uploaded files statically
app.use('/uploads', express.static(uploadDir));

app.use('/api/employees', EmployeeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    console.log(`Upload directory: ${uploadDir}`);
});