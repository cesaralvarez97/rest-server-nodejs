const { response, request } = require("express");
const bycryptjs = require("bcryptjs");
const User = require("../models/user");

const userGet = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
};

const userGetId = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  res.status(200).json({ user });
};

const userPut = async (req, res) => {
  const { userId } = req.params;
  const { password, email, username, ...rest } = req.body;

  //TODO valdiar contra base de datos
  if (password) {
    const salt = bycryptjs.genSaltSync();
    rest.password = bycryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(userId, rest);

  res.status(200).json({ user });
};

const userPost = async (req, res) => {
  const { username, password, email, repo } = req.body;
  const user = new User({ username, password, email, repo });

  //Encrypt
  const salt = bycryptjs.genSaltSync();
  user.password = bycryptjs.hashSync(password, salt);
  //Store
  await user.save();

  res.status(201).json({ user });
};

const userDelete = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByIdAndDelete(userId);
  res.status(200).json({ msg: "Removed", user });
};

module.exports = {
  userPut,
  userPost,
  userGet,
  userGetId,
  userDelete,
};
