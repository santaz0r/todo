const Todo = require("../models/Todo");

class TodoService {
  async getAll() {
    const todos = await Todo.find();
    return todos;
  }

  async createTodo({ ...rest }) {
    const newTodo = await Todo.create({ ...rest });

    return { newTodo };
  }
}

module.exports = new TodoService();
