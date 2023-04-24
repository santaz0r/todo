const Router = require("express");
const userController = require("../controllers/User.controller");
const router = new Router();
const { body } = require("express-validator");
const TodosController = require("../controllers/Todos.controller");

// auth
router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 4 }),
  body("name").notEmpty(),
  userController.signup
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refreshToken", userController.refreshToken);

router.get("/users", userController.getUsers);

// todos
router.get("/todos", TodosController.getTodos);
router.post("/todos", TodosController.createTOdo);
router.patch("/todos/:todoId", TodosController.updateTodo);

module.exports = router;
