# Workforce Management System

A robust Node.js backend application for managing departments, employees, and leave requests. It features RabbitMQ for asynchronous queue processing, Redis for caching, and follows best practices for scalability, security, and maintainability.

## Features

* Department management with hierarchical structures
* Employee management with roles and permissions
* Leave request management with status tracking (PENDING, APPROVED, REJECTED)
* RabbitMQ integration for asynchronous task processing
* Redis caching for faster data retrieval
* Health check endpoints for monitoring system status
* Rate limiting to prevent abuse
* Centralized error handling and standardized API responses
* UUIDs for all database IDs to ensure uniqueness
* Unit and integration testing with npm scripts

## Requirements

* Node.js >= 18
* MySQL >= 8.0
* RabbitMQ >= 3.9
* Redis >= 6.0

## Installation

1. Clone the repository:

```bash
git clone https://github.com/stephentk/Stephen-Kofoworola.git
cd Stephen-Kofoworola
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root:

```env
DB_HOST
DB_PORT
DB_USER
DB_PASS
DB_NAME
RABBITMQ_URL
PORT
REDIS_HOST
REDIS_PORT
```

4. Run MySQL migrations:

```bash
mysql -u root -p new_db < src/migrations/migration.sql
```

## Running the Application

```bash
npm start
```

The server will run on `http://localhost:3000`.

## Running Tests

Run all tests:

```bash
npm test
```

Run tests with watch mode:

```bash
npm run test:watch
```

Run coverage report:

```bash
npm run test:coverage
```

## API Endpoints

### Departments

* Create department:

```http
POST /api/departments
```

* Create department (ADMIN only):

```http
POST /api/departmentsAdmin
```

* List employees in a department:

```http
GET /api/departments/:id/employees
```

### Employees

* Create employee:

```http
POST /api/employees
```

* Get employee details:

```http
GET /api/employees/:id
```

* Get employee details with Redis caching:

```http
GET /api/employeesCaching/:id
```

### Leave Requests

* Create leave request:

```http
POST /api/leave-requests
```

## Health Checks

* Application health: `GET /health`
* RabbitMQ queue health: `GET /queue-health`

## Rate Limiting

* Maximum 300 requests per 15 minutes per IP

## Error Handling

* Centralized error handling middleware:

```javascript
app.use(errorHandler);
```

* All database IDs use UUIDs (`CHAR(36)`) for uniqueness and consistency.

## Notes & Best Practices
* Use role-based access for sensitive endpoints.
* Monitor queue length and system health regularly.

