const Regexp: { [index: string]: { pattern: RegExp; message: string } } = {
  email: {
    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    message: "It's must be email",
  },
  birthday: {
    pattern: /./g,
    message: "Don't be empty",
  },
  password: {
    pattern: /^\S{4,}$/g,
    message: 'Minimus 4 chars',
  },
  name: {
    pattern: /./g,
    message: "Don't be empty",
  },
  title: {
    pattern: /./g,
    message: "Don't be empty",
  },
  description: {
    pattern: /./g,
    message: "Don't be empty",
  },
  deadline: {
    pattern: /./g,
    message: "Don't be empty",
  },
  lastName: {
    pattern: /./g,
    message: "Don't be empty",
  },
  manager: {
    pattern: /./g,
    message: "Don't be empty",
  },
};

export default Regexp;
