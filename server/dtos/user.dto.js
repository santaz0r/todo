module.exports = class UserDto {
  email;
  id;
  name;
  role;
  manager;
  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.name = model.name;
    this.role = model.role;
    this.manager = model.manager;
  }
};
