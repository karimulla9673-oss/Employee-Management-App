const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    deleteEmployeeById,
    updateEmployeeById
} = require('../Controllers/EmployeeController');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Make sure this folder exists!
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    }
});

// Routes
router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.post('/', upload.single('profileImage'), createEmployee);
router.put('/:id', upload.single('profileImage'), updateEmployeeById);
router.delete('/:id', deleteEmployeeById);

module.exports = router;