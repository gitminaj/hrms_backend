// backend/routes/payrollRoutes.js
const express = require('express');
const router = express.Router();
const { login, register, logout, getProfile} = require('../controllers/authController');
const authMiddleware = require("../middleware/authMiddleware")

// Process Monthly Payroll (Admin/Accountant)
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", authMiddleware, getProfile);



module.exports = router;