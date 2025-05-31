import User from "../models/user.model.js";

const dashboardSummary = async (req, res) => {
  try {
    // get all users
    const users = await User.find();
    res.status(200).json({ totalUsers: users.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  const id = req.user.id;
  try {
    // check the role
    const currentUser = await User.findById({ _id: id });
    if (currentUser.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });

    // fetch admin and user
    const admins = await User.find({ role: "admin" });
    const user = await User.find({ role: "user" });

    // merge admin and user
    const users = [...admins, ...user];
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const _id = req.params.id;
  const id = req.user.id; //the id of the current user
  try {
    // check the role
    const currentUser = await User.findById({ _id: id });
    if (currentUser.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });
    // delete user
    await User.deleteOne({ _id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const _id = req.params.id;
  const id = req.user.id; //the id of the current user
  const { role, isActive, isVerified } = req.body;

  try {
    // check the role
    const currentUser = await User.findById({ _id: id });
    if (currentUser.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });
    // Update data
    await User.updateOne(
      { _id },
      { $set: { role, isActive, isVerified } },
      { runValidators: true }
    );

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, dashboardSummary, deleteUser, updateUser };
