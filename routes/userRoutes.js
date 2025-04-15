// backend/routes/payrollRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser,
    deleteUser, updateUserRole, getAllEmp
 } = require('../controllers/userController.js');
 const authMiddleware = require("../middleware/authMiddleware");
 const roleMiddleware = require('../middleware/roleMiddleware');

 router.get("/", authMiddleware, roleMiddleware(['Admin']), getAllUsers);
 router.get("/emp", authMiddleware, roleMiddleware(['Admin', "HR Manager"]), getAllEmp);
 router.get("/:id", authMiddleware, getUserById);
 router.put("/:id", authMiddleware, updateUser);
 router.delete("/:id", authMiddleware, roleMiddleware(['Admin']),  deleteUser);
//  router.patch("/:id/role", authMiddleware,  updateUserRole);


module.exports = router;