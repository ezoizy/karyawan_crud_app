"use strict";

const employeeData = require("../masterdata/employee.json");
const employeeDataMapped = employeeData.map((eachEmployeeData) => {
  eachEmployeeData.createdAt = new Date();
  eachEmployeeData.updatedAt = new Date();
  return eachEmployeeData;
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("employees", employeeDataMapped, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("employees", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
