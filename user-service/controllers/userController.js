const Role = require("../models/Role.js");
const User = require("../models/User.js");

//Role.findOne({ IsAdmin: true });
exports.createUser = async (req, res) => {
  try {
    const {
      FirstName,
      LastName,
      Email,
      Password,
      DateOfBirth,
      PhoneNumber,
      Role: UserRole, // Rename Role from req.body to UserRole
    } = req.body;

    if (
      !FirstName ||
      !LastName ||
      !Email ||
      !Password ||
      !DateOfBirth ||
      !PhoneNumber
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    let defaultRole = await Role.findOne({ IsAdmin: false });

    if (!defaultRole) {
      defaultRole = await Role.create({ IsAdmin: false });
    }

    const newUser = new User({
      FirstName,
      LastName,
      Email,
      Password,
      DateOfBirth,
      PhoneNumber,
      Role: UserRole ? UserRole : defaultRole._id,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { FirstName, LastName, Email, Password, DateOfBirth, PhoneNumber } =
      req.body;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.FirstName = FirstName;
    user.LastName = LastName;
    user.Email = Email;
    user.Password = Password;
    user.DateOfBirth = DateOfBirth;
    user.PhoneNumber = PhoneNumber;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
