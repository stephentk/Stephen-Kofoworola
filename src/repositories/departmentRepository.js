class DepartmentRepository {
  constructor({ Department }) {
    this.Department = Department;
  }
  async create(dto, trx = null) {
    return this.Department.create(dto, { transaction: trx });
  }
  async findById(id) {
    return this.Department.findByPk(id);
  }
}
module.exports = DepartmentRepository;
