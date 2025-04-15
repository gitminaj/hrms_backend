const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Attendance = sequelize.define("Attendance", {
    // id: {
    //     type: DataTypes.INTEGER,
    //         autoIncrement: true,
    //         primaryKey: true,
    //         allowNull: false
    // },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    date:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    checkIn: {
        type: DataTypes.TIME,
        allowNull: false
    },
    checkOut: {
        type: DataTypes.TIME
    },
    status: {
        type: DataTypes.STRING,
        enum: ['Present', 'Absent', 'Half-day', 'Late'],
        default: 'Present'
      }
}, { timestamps: true });

Attendance.belongsTo(User, { foreignKey: "employeeId" });

module.exports = Attendance;
