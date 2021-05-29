const { Schema, model } = require("mongoose");

const RepoSchemma = Schema({
  name: { type: String, require: [true, "The name is necessary"] },
  url: { type: String, require: [true, "The url is necessary"] },
  description: {
    type: String,
    require: [true, "The description is necessary"],
  },
  stack: [],
});

module.exports = model("Repo", RepoSchemma);
