// backend/routes/leaveRoutes.js
const express = require('express');
const router = express.Router();
const {applyLeave, getLeaveRequests, approveLeave, 
  getLeaveRequestsByEmployeeId, getUserLeaveHistory } = require('../controllers/leaveController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Apply for Leave (Employee)
router.post("/apply", authMiddleware, roleMiddleware(["Employee"]), applyLeave);

// // HR/Admin can view leave requests
router.get("/requests", authMiddleware, roleMiddleware(["HR Manager", "Admin", 'Employee']), getLeaveRequests);
router.get("/request/:id", authMiddleware, roleMiddleware(["HR Manager", "Admin", 'Employee']), getLeaveRequestsByEmployeeId);

// // HR/Admin can approve/reject leave requests
router.put("/update/:id", authMiddleware, roleMiddleware(["HR Manager", "Admin"]), approveLeave);
// router.put("/:id/reject", authMiddleware, roleMiddleware(["HR Manager", "Admin"]), rejectLeave);

// // Employees can view their leave history
// router.get("/history", authMiddleware, getUserLeaveHistory);


module.exports = router;