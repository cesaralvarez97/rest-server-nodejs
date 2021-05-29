const { Schema, model } = require("mongoose");

const UserSchemma = Schema({
  username: {
    type: String,
    require: [true, "The username is necessary"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "The password is necessary"],
  },
  email: {
    type: String,
    require: [true, "The email is necessary"],
    unique: true,
  },
  repos: {
    type: Number,
    require: [true, "The repo is necessary"],
  },
});

module.exports = model("User", UserSchemma);
