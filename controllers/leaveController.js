const  Leave  = require("../models/Leave.js");
const  User  = require("../models/User.js");

// Apply for leave (Employee)
exports.applyLeave = async (req, res) => {
    try {
        const { startDate, endDate, reason } = req.body;
        const { id } = req.user;

        // const prevsRequest = await Leave.findOne({ where: { employeeId: id }});

        // console.log('id: ', id)
        // console.log('prevrequest: ', prevsRequest)

        // if(!prevsRequest){
            const leave = await Leave.create({ employeeId: id, startDate, endDate, reason, status: "Pending" });

           return res.status(201).json({ message: "Leave request submitted", leave });
        // }
        
        //   res.status(500).json({
        //       success: false,
        //       message: 'Leave request already exist.'
        //   })
      
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get leave requests (HR/Admin)
exports.getLeaveRequests = async (req, res) => {
    try {
        const leaves = await Leave.findAll({
            include:[{
                model: User
            }]
        });
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getLeaveRequestsByEmployeeId = async (req, res) => {
    try {
        const leaves = await Leave.findAll({ where: { employeeId: req.params.id }},{
            include:[{
                model: User
            }]
        });
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Approve leave (HR/Admin)
exports.approveLeave = async (req, res) => {
    try {
        const { status } = req.body;
        const leave = await Leave.findByPk(req.params.id);
        if (!leave) return res.status(404).json({ message: "Leave request not found" });

        leave.status = status;
        await leave.save();
        res.json({ message: "Leave status updated", leave });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
