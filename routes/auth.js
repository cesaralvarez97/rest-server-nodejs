const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validateFields } = require("../middleware/validate-fields");

const router = Router();

/**
 * Return an authentication token
 */
router.post(
  "/login",
  [
    check("email", "The email is necessary").isEmail(),
    check("password", "The password is necessary").not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = router;
