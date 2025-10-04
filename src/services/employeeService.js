const redis = require("../config/redis");

class EmployeeService {
  constructor({ employeeRepository, departmentRepository }) {
    this.employeeRepository = employeeRepository;
    this.departmentRepository = departmentRepository;
  }
  async createEmployee({ name, email, departmentId }) {
    const dept = await this.departmentRepository.findById(departmentId);
    if (!dept) throw new Error("Department not found");
    return this.employeeRepository.create({ name, email, departmentId ,role:"ADMIN"});
  }
    async getEmployeeWithLeaves(id, leaveRepository) {
      const employee = await this.employeeRepository.findById(id);
      if (!employee) return null;
      const leaves = await leaveRepository.findByEmployee(id);
      return { employee, leaves };
    }
    //caching
  // async getEmployeeWithLeaves(id, leaveRepository) {
  //   // 1. Check Redis cache
  //   const cached = await redis.get(`employee:${id}:withLeaves`);
  //   if (cached) {
  //     return JSON.parse(cached);
  //   }

  //   // 2. Fetch from DB if not cached
  //   const employee = await this.employeeRepository.findById(id);
  //   if (!employee) return null;

  //   const leaves = await leaveRepository.findByEmployee(id);
  //   const result = { employee, leaves };

  //   // 3. Save to Redis with TTL (e.g., 1 hour)
  //   await redis.setex(
  //     `employee:${id}:withLeaves`,
  //     3600,
  //     JSON.stringify(result),
  //   );

  //   return result;
  // }
  async listByDepartment(deptId, opts) {
    return this.employeeRepository.findByDepartment(deptId, opts);
  }
}
module.exports = EmployeeService;
