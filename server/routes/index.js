const Router = require("express");
const userController = require("../controllers/User.controller");
const router = new Router();
const { body } = require("express-validator");

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 4 }),
  userController.signup
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refreshToken", userController.refreshToken);
router.get("/users", userController.getUsers);

module.exports = router;
