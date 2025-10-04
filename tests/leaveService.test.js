const LeaveService = require("../src/services/leaveService");
describe("LeaveService", () => {
  test("requestLeave publishes to queue and creates leave", async () => {
    const created = {
      id: 123,
      employeeId: 1,
      startDate: "2025-01-01",
      endDate: "2025-01-02",
      status: "PENDING",
    };
    const repo = { create: jest.fn().mockResolvedValue(created) };
    const pub = { publishLeaveRequested: jest.fn().mockResolvedValue(null) };
    const svc = new LeaveService({ leaveRepository: repo, publisher: pub });
    const res = await svc.requestLeave({
      employeeId: 1,
      startDate: "2025-01-01",
      endDate: "2025-01-02",
    });
    expect(repo.create).toHaveBeenCalled();
    expect(pub.publishLeaveRequested).toHaveBeenCalledWith(
      expect.objectContaining({ leaveId: created.id }),
    );
    expect(res).toBe(created);
  });
});
