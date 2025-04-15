const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Leave = sequelize.define("Leave", {
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
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
        defaultValue: "Pending"
    }
}, { timestamps: true });

Leave.belongsTo(User, { foreignKey: "employeeId" });

module.exports = Leave;
