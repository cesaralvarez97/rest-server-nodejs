const User = require("../models/user");
const Repo = require("../models/repos");

const existEmail = async (email = "") => {
  const existEmail = await User.findOne({ email });
  if (existEmail) throw new Error(`This email: ${email} is already registered`);
};

const existUsername = async (username = "") => {
  const existUsername = await User.findOne({ username });
  if (existUsername)
    throw new Error(`This username: ${username} is already registered`);
};

const existUserById = async (id) => {
  const existUser = await User.findById(id);
  if (!existUser) throw new Error(`This user: ${id} doesn't exist`);
};

const existRepoById = async (id) => {
  const existRepo = await Repo.findById(id);
  if (!existRepo) throw new Error(`This repo: ${id} doesn't exist`);
};

module.exports = {
  existEmail,
  existUsername,
  existUserById,
  existRepoById,
};
