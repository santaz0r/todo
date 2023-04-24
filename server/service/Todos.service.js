const TodoDto = require("../dtos/todo.dto");
const Todo = require("../models/Todo");

class TodoService {
  async getAll() {
    const todos = await Todo.find();
    return todos;
  }

  async createTodo({ ...rest }) {
    const newTodo = await Todo.create({ ...rest });
    const todoDto = new TodoDto(newTodo);
    return { todoDto };
  }
}

module.exports = new TodoService();
