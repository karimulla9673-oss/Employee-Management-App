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

// CORS configuration - Allow your frontend domain
const corsOptions = {
    origin: [
        'http://localhost:3000', // For local development
        'https://employee-management-app-2.onrender.com', // Your deployed frontend
        // Add any other frontend URLs you might have
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Serve uploaded files statically
app.use('/uploads', express.static(uploadDir));

app.use('/api/employees', EmployeeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    console.log(`Upload directory: ${uploadDir}`);
});