const { employee } = require("../models");

const employeeController = {
  getAll: async (req, res) => {
    try {
      let { page, row } = req.query;

      page -= 1;

      const options = {
        attributes: ["id", "name", "age", "email", "phone_number", "address"],
        // offset: page * row,
        // limit: row,
        order: [["id", "ASC"]],
      };

      const allemployee = await employee.findAll(options);
      return res.status(200).json({
        status: "success",
        result: allemployee,
      });
    } catch (error) {
      return res
        .status(503)
        .json({ status: "Failed", message: "System Error" });
    }
  },
  getById: async (req, res) => {
    try {
      const foundEmployee = await employee.findByPk(req.params.id);
      if (!foundEmployee) {
        return res.status(404).json({
          status: "Failed",
          message: "Id Not Found",
        });
      }
      return res.status(200).json({
        status: "Success",
        data: foundEmployee,
      });
    } catch (error) {
      return res
        .status(503)
        .json({ status: "Failed", message: "System Error" });
    }
  },
  create: async (req, res) => {
    try {
      const { id, name, age, email, phone_number, address } = req.body;

      const createdEmployee = await employee.create({
        id: id,
        name: name,
        email: email,
        age: age,
        phone_number: phone_number,
        address: address,
      });
      return res.status(201).json({
        status: "Success",
        data: createdEmployee,
      });
    } catch (error) {
      return res
        .status(503)
        .json({ status: "Failed", message: "System Error" });
    }
  },
  update: async (req, res) => {
    const employeeId = req.params.id;
    try {
      const { id, name, age, email, phone_number, address } = req.body;

      //Update Employee
      const updateEmployee = await employee.update(
        {
          id: id,
          name: name,
          email: email,
          age: age,
          phone_number: phone_number,
          address: address,
        },
        {
          where: {
            id: employeeId,
          },
        }
      );

      //Cek Apakah Sukses
      if (!updateEmployee) {
        return res.status(403).json({
          status: "Failed",
          message: "Method Not Allowed",
        });
      }

      //Found Employee
      const foundEmployee = await employee.findOne({
        where: { id: employeeId },
      });

      //Cek
      if (!foundEmployee) {
        return res.status(404).json({
          status: "Failed",
          message: "Id Not Found",
        });
      }

      //Jika semua berhasil return employee yang telah terupdate
      return res.status(201).json({
        status: "Success",
        data: foundEmployee,
      });
    } catch (error) {
      return res
        .status(503)
        .json({ status: "Failed", message: "System Error" });
    }
  },

  delete: async (req, res) => {
    const employeeId = req.params.id;
    try {
      const deleteEmployee = await employee.destroy({
        where: {
          id: employeeId,
        },
      });
      // If Error
      if (deleteEmployee == 0) {
        return res.status(404).json({
          status: "Failed",
          message: "Id Not Found",
        });
      }

      //If Success
      return res.status(201).json({
        status: "Success",
        msg: "Data berhasil di delete",
      });
    } catch (error) {
      return res
        .status(503)
        .json({ status: "Failed", message: "System Error" });
    }
  },
};

module.exports = employeeController;
