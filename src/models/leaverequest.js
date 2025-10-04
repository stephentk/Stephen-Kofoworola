const { DataTypes } = require("sequelize");
module.exports = (sequelize) =>
  sequelize.define(
    "LeaveRequest",
    {
     id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Automatically generate UUID v4
        primaryKey: true,
      },
      employeeId: { type: DataTypes.BIGINT, allowNull: false },
      startDate: { type: DataTypes.DATEONLY, allowNull: false },
      endDate: { type: DataTypes.DATEONLY, allowNull: false },
      status: {
        type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
        defaultValue: "PENDING",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    { tableName: "leave_requests", timestamps: false },
  );
