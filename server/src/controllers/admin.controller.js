import User from "../models/user.model.js";

const dashboardSummary = async (req, res) => {
  try {
    // get all users
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  const id = req.user.id;
  try {
    // check the role
    const user = await User.findOne({ _id: id });
    if (user.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });

    // get all users
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, dashboardSummary };
