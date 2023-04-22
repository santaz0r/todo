const Router = require("express");
const userController = require("../controllers/User.controller");
const router = new Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refreshToken", userController.refreshToken);
router.get("/users", userController.getUsers);

module.exports = router;
