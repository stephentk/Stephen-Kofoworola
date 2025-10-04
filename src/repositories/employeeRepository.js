class EmployeeRepository {
  constructor({ Employee }) {
    this.Employee = Employee;
  }
  async create(dto, trx = null) {
    return this.Employee.create(dto, { transaction: trx });
  }
  async findById(id) {
    return this.Employee.findByPk(id);
  }
  async findByDepartment(departmentId, { page = 1, limit = 20 }) {
    const offset = (page - 1) * limit;
    return this.Employee.findAndCountAll({
      where: { departmentId },
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });
  }
}
module.exports = EmployeeRepository;
