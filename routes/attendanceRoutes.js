// backend/routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const {markAttendance, getAttendanceRecords, getTodayAttendance,
    getTodysAttendanceOfEmployees
 } = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Employee Check-in
router.post("/mark", authMiddleware, roleMiddleware(["Employee"]), markAttendance);

router.get("/today", authMiddleware, roleMiddleware(["Employee"]), getTodayAttendance);

router.get("/todayAllEmployee", authMiddleware, roleMiddleware(["HR Manager","Employee"]), getTodysAttendanceOfEmployees);
// // HR/Admin can view attendance records
router.get("/records", authMiddleware, roleMiddleware(["HR Manager", "Admin"]), getAttendanceRecords);

module.exports = router;