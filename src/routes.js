const express = require("express");
const departmentController = require("./controllers/departmentController");
const employeeController = require("./controllers/employeeController");
const leaveController = require("./controllers/leaveController");
const authorize = require("./middleware/authorize");

const router = express.Router();

// Department routes
router.post("/departments", departmentController.create);
//forADMIN
//router.post("/departments", authorize(["ADMIN"]), departmentController.create);
router.get("/departments/:id/employees", employeeController.listByDepartment);

// Employee routes
router.post("/employees", employeeController.create);
router.get("/employees/:id", employeeController.getEmployee);

// Leave request routes
router.post("/leave-requests", leaveController.create);

module.exports = router;
