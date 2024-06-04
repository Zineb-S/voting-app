const Role = require("../models/Role");

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error); // Log error
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.addRole = async (req, res) => {
  try {
    const { IsAdmin } = req.body;

    const newRole = new Role({
      IsAdmin,
    });

    await newRole.save();

    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
