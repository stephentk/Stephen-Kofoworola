const models = require("../models");
const LeaveRepository = require("../repositories/leaveRepository");
const LeaveService = require("../services/leaveService");
const publisher = require("../queue/publisher");
const leaveRepo = new LeaveRepository({ LeaveRequest: models.LeaveRequest });
const service = new LeaveService({ leaveRepository: leaveRepo, publisher });
exports.create = async (req, res, next) => {
  try {
    const { employeeId, startDate, endDate } = req.body;
    const leave = await service.requestLeave({
      employeeId,
      startDate,
      endDate,
    });
    return res.status(201).json(leave);
  } catch (err) {
    next(err);
  }
};
