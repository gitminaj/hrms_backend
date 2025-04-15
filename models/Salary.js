const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Salary = sequelize.define("Salary", {
    // id: {
    //     type: DataTypes.UUID,
    //     defaultValue: DataTypes.UUIDV4,
    //     primaryKey: true
    // },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    salary: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    deductions: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    tax: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM("Pending", "Approved"),
        defaultValue: "Pending"
    }
}, { timestamps: true });

Salary.belongsTo(User, { foreignKey: "employeeId" });

module.exports = Salary;
