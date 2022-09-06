const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controllers");

//Employe Route
router.get("/", employeeController.getAll);
router.get("/:id", employeeController.getById);
router.post("/", employeeController.create);
router.patch("/:id", employeeController.update);
router.delete("/:id", employeeController.delete);

module.exports = router;
