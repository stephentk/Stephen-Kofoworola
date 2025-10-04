const { Department } = require("../models");
const DepartmentRepository = require("../repositories/departmentRepository");
const DepartmentService = require("../services/departmentService");
const repo = new DepartmentRepository({ Department });
const service = new DepartmentService({ departmentRepository: repo });
exports.create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const dept = await service.createDepartment({ name });
    return res.status(201).json(dept);
  } catch (err) {
    next(err);
  }
};
