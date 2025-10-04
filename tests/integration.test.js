const request = require("supertest");
const app = require("../src/app");
const { sequelize } = require("../src/models");
jest.mock("../src/queue/publisher", () => ({
  publishLeaveRequested: jest.fn().mockResolvedValue(true),
}));
beforeAll(async () => {
  await sequelize.authenticate();
});
afterAll(async () => {
  await sequelize.close();
});
describe("API integration", () => {
  let deptId, empId;
  test("create department", async () => {
    const res = await request(app)
      .post("/api/departments")
      .send({ name: "Engineering" });
    expect(res.statusCode).toBe(201);
    deptId = res.body.data.id;
  });
  test("create employee", async () => {
    const res = await request(app)
      .post("/api/employees")
      .send({
        name: "Alice",
        email: `alice.${Date.now()}@example.com`,
        departmentId: deptId,
      });
    expect(res.statusCode).toBe(201);
    empId = res.body.data.id;
  });
  test("create leave request publishes to queue", async () => {
    const res = await request(app).post("/api/leave-requests").send({
      employeeId: empId,
      startDate: "2025-01-01",
      endDate: "2025-01-02",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.status).toBe("PENDING");
  });
});
