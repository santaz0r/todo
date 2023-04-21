const Router = require("express");

const router = new Router();

router.post("/signup");
router.post("/login");
router.post("/logout");
router.get("/refreshToken");
router.get("/users");

module.exports = router;
