const { validationResult } = require("express-validator");

const ApiErrors = require("../exceptions/Errors");
const TodoService = require("../service/Todos.service");

class TodoController {
  async getTodos(req, res, next) {
    try {
      const todos = await TodoService.getAll();
      return res.json(todos);
    } catch (e) {
      next(e);
    }
  }

  async createTOdo(req, res, next) {
    try {
      const data = await TodoService.createTodo({ ...req.body });
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TodoController();
