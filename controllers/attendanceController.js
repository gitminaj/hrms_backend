const  Attendance  = require("../models/Attendance.js");
const  User  = require("../models/User.js");

exports.markAttendance = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    console.log('Marking attendance for date:', today, 'Employee ID:', req.user.id);
    
    // Check if an attendance record already exists for today
    const existingRecord = await Attendance.findOne({
      where: {
        employeeId: req.user.id,
        date: today
      }
    });

    console.log('Existing record found:', existingRecord ? 'Yes' : 'No');
  
    if (!existingRecord) {
      // First check-in of the day
      const attendance = await Attendance.create({
        employeeId: req.user.id,
        date: today,
        checkIn: new Date(),
        checkOut: null,
        status: 'Present'
      });
      
      console.log('Created new check-in record');
      
      return res.status(201).json({ 
        message: "Check-in recorded successfully", 
        attendance,
        status: "checkedIn" 
      });
    } else if (existingRecord && !existingRecord.checkOut) {
      // Check-out (update existing record)
      existingRecord.checkOut = new Date();
      await existingRecord.save();
      
      console.log('Updated record with check-out time');
      
      return res.status(200).json({ 
        message: "Check-out recorded successfully", 
        attendance: existingRecord,
        status: "checkedOut" 
      });
    } else {
      // Already checked in and out for today
      console.log('Attendance already completed for today');
      
      return res.status(400).json({ 
        message: "You have already completed your attendance for today",
        status: "completed"
      });
    }
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
  
  // Get today's attendance for the logged-in employee
  exports.getTodayAttendance = async (req, res) => {
    try {
      // Get the employee ID from the authenticated user
      const employeeId = req.user.id; 
      
      // Get today's date in the format used in your database
      const today = new Date().toISOString().split('T')[0];
      console.log('Checking attendance for date:', today, 'Employee ID:', employeeId);
      
      // Find the attendance record for this employee for today
      // Use the proper Sequelize WHERE clause format
      const record = await Attendance.findOne({
        where: {
          employeeId: employeeId,
          date: today
        }
      });
      
      console.log('Today attendance query result:', record ? 'Record found' : 'No record found');
      
      if (!record) {
        return res.status(200).json({ 
          status: 'ready', 
          record: null,
          message: 'No attendance record found for today'
        });
      } else if (record && !record.checkOut) {
        return res.status(200).json({ 
          status: 'checkedIn', 
          record,
          message: 'Already checked in today'
        });
      } else {
        return res.status(200).json({ 
          status: 'completed', 
          record,
          message: 'Attendance completed for today'
        });
      }
    } catch (error) {
      console.error('Error fetching today\'s attendance:', error);
      res.status(500).json({ 
        message: "Server error", 
        error: error.message 
      });
    }
  };
  

// Get attendance records (HR/Admin)
exports.getAttendanceRecords = async (req, res) => {
    try {
        const records = await Attendance.findAll();
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get attendance records (HR/Admin)
exports.getTodysAttendanceOfEmployees = async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
    try {
        const records = await Attendance.findAll({
          where:{
            date: today,
          }, include:[{
            model: User
        }]
        }, );
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};