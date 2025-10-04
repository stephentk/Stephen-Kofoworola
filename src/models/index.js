const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DB_NAME || "wm",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
  },
);
const Department = require("./department")(sequelize);
const Employee = require("./employee")(sequelize);
const LeaveRequest = require("./leaverequest")(sequelize);
Department.hasMany(Employee, { foreignKey: "departmentId" });
Employee.belongsTo(Department, { foreignKey: "departmentId" });
Employee.hasMany(LeaveRequest, { foreignKey: "employeeId" });
LeaveRequest.belongsTo(Employee, { foreignKey: "employeeId" });
module.exports = { sequelize, Department, Employee, LeaveRequest };
