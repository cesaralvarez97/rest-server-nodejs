const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/generate-jwt");
const User = require("../models/user");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //Email and user verify verify
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User/Pass are wrong",
      });
    }

    //Password verify
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "User/Pass are wrong",
      });
    }

    //JWT generator
    const token = await generateJWT(user.id);

    res.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Something goes wrong",
    });
  }
};

module.exports = {
  login,
};
