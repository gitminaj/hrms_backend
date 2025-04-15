const  Payroll  = require("../models/Salary.js");

// Generate payroll (Accountant)
exports.generatePayroll = async (req, res) => {
    try {
        const { employeeId, salary, deductions, tax } = req.body;

        const payroll = await Payroll.create({ employeeId, salary, deductions, tax });
        res.status(201).json({ message: "Payroll generated successfully", payroll });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get payroll records (HR/Admin)
exports.getPayrollRecords = async (req, res) => {
    try {
        const payrolls = await Payroll.findAll();
        res.json(payrolls);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Approve payroll (HR/Admin)
exports.approvePayroll = async (req, res) => {
    try {
        const payroll = await Payroll.findByPk(req.params.id);
        if (!payroll) return res.status(404).json({ message: "Payroll not found" });

        payroll.status = "Approved";
        await payroll.save();
        res.json({ message: "Payroll approved successfully", payroll });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
