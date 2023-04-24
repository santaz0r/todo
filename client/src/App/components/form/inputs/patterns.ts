const Regexp: { [index: string]: { pattern: RegExp; message: string } } = {
  email: {
    pattern: /^\S+@\S+\.\S\S+$/g,
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
};

export default Regexp;
