const { DataTypes } = require("sequelize");
module.exports = (sequelize) =>
  sequelize.define(
    "Department",
    {
  id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Automatically generate UUID v4
        primaryKey: true,
      },
      name: { type: DataTypes.STRING(255), allowNull: false },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    { tableName: "departments", timestamps: false },
  );
