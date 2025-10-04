class LeaveService {
  constructor({ leaveRepository, publisher }) {
    this.leaveRepository = leaveRepository;
    this.publisher = publisher;
  }
  async requestLeave({ employeeId, startDate, endDate }) {
    const leave = await this.leaveRepository.create({
      employeeId,
      startDate,
      endDate,
      status: "PENDING",
      
    });
    await this.publisher.publishLeaveRequested({
      leaveId: leave.id,
      employeeId,
      startDate,
      endDate,
    });
    return leave;
  }
}
module.exports = LeaveService;
