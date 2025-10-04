USE new_db;

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    departmentId CHAR(36) NOT NULL,
    role ENUM('ADMIN', 'EMPLOYEE') DEFAULT 'EMPLOYEE',
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (departmentId) REFERENCES departments(id) 
        ON DELETE RESTRICT 
        ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_employees_departmentId ON employees (departmentId);
CREATE INDEX idx_employees_email ON employees (email);

-- Leave requests table
CREATE TABLE IF NOT EXISTS leave_requests (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    employeeId CHAR(36) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    status ENUM('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employeeId) REFERENCES employees(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_leave_requests_employeeId ON leave_requests (employeeId);
CREATE INDEX idx_leave_requests_status ON leave_requests (status);

