const userCtrl = {};
const User = require("../models/User");

userCtrl.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

userCtrl.createUser = async (req, res) => {
  const { nombre } = req.body;
  const newUser = new User({ nombre });
  await newUser.save();
  res.json("Usuario creado");
};

userCtrl.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json("Usuario eliminado");
};

module.exports = userCtrl;
