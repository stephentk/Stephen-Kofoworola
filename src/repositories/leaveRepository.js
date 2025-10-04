class LeaveRepository {
  constructor({ LeaveRequest }) {
    this.LeaveRequest = LeaveRequest;
  }
  async create(dto, trx = null) {
    return this.LeaveRequest.create(dto, { transaction: trx });
  }
  async findByEmployee(employeeId) {
    return this.LeaveRequest.findAll({
      where: { employeeId },
      order: [["createdAt", "DESC"]],
    });
  }
  async updateStatus(id, status) {
    return this.LeaveRequest.update({ status }, { where: { id } });
  }
}
module.exports = LeaveRepository;
