const { Router } = require("express");
const { check } = require("express-validator");
const { existRepoById } = require("../helpers/db-validators");
const { validateFields } = require("../middleware/validate-fields");
const {
  repoGet,
  repoGetId,
  repoPut,
  repoPost,
  repoDelete,
} = require("../controllers/repo");
const { validateJWT } = require("../middleware/validate-jwt");

const router = Router();

/**
 * Crud repository operations
 */

/**
 * Return all repositories
 */
router.get("/", [validateJWT, validateFields], repoGet);

/**
 * Return repository by id
 */
router.get(
  "/:repoId",
  [
    validateJWT,
    check("repoId", "The userId is not valid").isMongoId(),
    check("repoId").custom(existRepoById),
    validateFields,
  ],
  repoGetId
);

/**
 * Create a repository
 */
router.post(
  "/",
  [
    validateJWT,
    check("name", "The name is necessary").not().isEmpty(),
    check("url", "The url is necessary").not().isEmpty(),
    check("url", "The url must be an url").isURL(),
    check("description", "The description is necessary").not().isEmpty(),
    check("stack", "The stack is necessary").not().isEmpty(),
  ],
  repoPost
);

/**
 * Update existing repository by id
 */
router.put(
  "/:repoId",
  [
    validateJWT,
    check("repoId", "The userId is not valid").isMongoId(),
    check("repoId").custom(existRepoById),
    validateFields,
  ],
  repoPut
);

/**
 * Remove existing repository by id
 */
router.delete(
  "/:repoId",
  [
    validateJWT,
    check("repoId", "The userId is not valid").isMongoId(),
    check("repoId").custom(existRepoById),
    validateFields,
  ],
  repoDelete
);

module.exports = router;
