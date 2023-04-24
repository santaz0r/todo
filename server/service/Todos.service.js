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

  async updateTodo(link, { ...rest }) {
    const updatedTodo = await Todo.findByIdAndUpdate(link, rest, { new: true });
    return updatedTodo;
  }
}

module.exports = new TodoService();
