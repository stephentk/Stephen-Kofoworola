const models = require("../models");
const EmployeeRepository = require("../repositories/employeeRepository");
const DepartmentRepository = require("../repositories/departmentRepository");
const EmployeeService = require("../services/employeeService");
const LeaveRepository = require("../repositories/leaveRepository");
const empRepo = new EmployeeRepository({ Employee: models.Employee });
const deptRepo = new DepartmentRepository({ Department: models.Department });
const leaveRepo = new LeaveRepository({ LeaveRequest: models.LeaveRequest });
const service = new EmployeeService({
  employeeRepository: empRepo,
  departmentRepository: deptRepo,
});
exports.create = async (req, res, next) => {
  try {
    const { name, email, departmentId } = req.body;
    const employee = await service.createEmployee({
      name,
      email,
      departmentId,
    });
    return res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
};
exports.getEmployee = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await service.getEmployeeWithLeaves(id, leaveRepo);
    if (!result)
      return res
        .status(404)
        .json({ success: false, data: null, error: "Employee not found" });
    return res.json(result);
  } catch (err) {
    next(err);
  }
};
exports.listByDepartment = async (req, res, next) => {
  try {
    const deptId = req.params.id;
    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "20", 10);
    const result = await service.listByDepartment(deptId, { page, limit });
    return res.json(result);
  } catch (err) {
    next(err);
  }
};
