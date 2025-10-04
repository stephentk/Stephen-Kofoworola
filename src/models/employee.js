const { DataTypes } = require("sequelize");
module.exports = (sequelize) =>
  sequelize.define(
    "Employee",
    {
       id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Automatically generate UUID v4
        primaryKey: true,
      },
      name: { type: DataTypes.STRING(255), allowNull: false },
      email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      departmentId: { type: DataTypes.BIGINT, allowNull: false },
       role:{type: DataTypes.STRING(255), allowNull: false, unique: true },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    { tableName: "employees", timestamps: false },
  );
