module.exports = class TodoDto {
  title;
  id;
  description;
  constructor(model) {
    this.title = model.title;
    this.id = model._id;
    this.description = model.description;
  }
};
