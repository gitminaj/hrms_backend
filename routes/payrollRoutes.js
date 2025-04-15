// backend/routes/payrollRoutes.js
const express = require('express');
const router = express.Router();
const {generatePayroll, getPayrollRecords, approvePayroll,
  getPayslip } = require('../controllers/payrollController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Process Monthly Payroll (Admin/Accountant)
router.post("/generate", authMiddleware, roleMiddleware(["Accountant"]), generatePayroll);

// // HR/Admin can view payroll records
router.get("/records", authMiddleware, roleMiddleware(["HR Manager", "Admin"]), getPayrollRecords);

// // // HR/Admin can approve payroll
router.put("/:id/approve", authMiddleware, roleMiddleware(["HR Manager", "Admin"]), approvePayroll);

// // // Employees can download their payslip
// router.get("/:id/payslip", authMiddleware, roleMiddleware(["Employee"]), getPayslip);

module.exports = router;