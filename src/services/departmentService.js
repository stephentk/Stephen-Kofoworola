class DepartmentService {
  constructor({ departmentRepository }) {
    this.departmentRepository = departmentRepository;
  }
  async createDepartment({ name }) {
    if (!name) throw new Error("Department name required");
    return this.departmentRepository.create({ name });
  }
}
module.exports = DepartmentService;
