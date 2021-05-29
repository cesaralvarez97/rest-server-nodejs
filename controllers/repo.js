const { response, request } = require("express");
const Repo = require("../models/repos");

const repoGet = async (req, res) => {
  const repo = await Repo.find();
  res.status(200).json({ repo });
};

const repoGetId = async (req, res) => {
  const { repoId } = req.params;
  const repo = await Repo.findById(repoId);
  res.status(200).json({ repo });
};

const repoPost = async (req, res) => {
  const { name, url, description, stack } = req.body;
  const repo = new Repo({ name, url, description, stack });

  //Store
  await repo.save();

  res.status(201).json({ repo });
};

const repoPut = async (req, res) => {
  const { repoId } = req.params;
  const { body } = req;
  const repo = await Repo.findByIdAndUpdate(repoId, body);

  res.status(200).json({ repo });
};
const repoDelete = async (req, res) => {
  const { repoId } = req.params;

  const repo = await Repo.findByIdAndDelete(repoId);
  res.status(200).json({ msg: "Removed", repo });
};

module.exports = {
  repoGet,
  repoGetId,
  repoPost,
  repoPut,
  repoDelete,
};
