const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middleware/validate-fields");
const {
  existEmail,
  existUsername,
  existUserById,
} = require("../helpers/db-validators");

const {
  userGet,
  userPost,
  userPut,
  userDelete,
  userGetId,
} = require("../controllers/user");
const { validateJWT } = require("../middleware/validate-jwt");

const router = Router();

/**
 * Crud user operations
 *
 */

/**
 * Return all users
 */
router.get("/", [validateJWT, validateFields], userGet);

/**
 * Return user by id
 */
router.get(
  "/:userId",
  [
    validateJWT,
    check("userId", "The userId is not valid").isMongoId(),
    check("userId").custom(existUserById),
    validateFields,
  ],
  userGetId
);

/**
 * Update existing user by id
 */
router.put(
  "/:userId",
  [
    validateJWT,
    check("userId", "The userId is not valid").isMongoId(),
    check("userId").custom(existUserById),
    check("email").custom(existEmail),
    check("username").custom(existUsername),
    validateFields,
  ],
  userPut
);

/**
 * Create new user
 */
router.post(
  "/",
  [
    validateJWT,
    check("email", "The email is not valid").isEmail(),
    check("username", "The username is necessary").not().isEmpty(),
    check("password", "The password is necessary").not().isEmpty(),
    check("repo", "The repo is necessary").not().isEmpty(),
    check("email").custom(existEmail),
    check("username").custom(existUsername),
    validateFields,
  ],
  userPost
);

/**
 * Delete existing user by id
 */
router.delete(
  "/userId",
  [
    validateJWT,
    check("userId", "The userId is not valid").isMongoId(),
    check("userId").custom(existUserById),
    validateFields,
  ],
  userDelete
);

module.exports = router;
