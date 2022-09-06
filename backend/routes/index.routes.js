const express = require("express");
const router = express.Router();
const employeeRoutes = require("./employee.routes");

//Route Employee
router.use("/employee", employeeRoutes);

module.exports = router;
