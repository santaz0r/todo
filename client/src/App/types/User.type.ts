type TUser = {
  email: string;
  id: string;
  name: string;
  role: 'manager' | 'user';
};

type TFullDataUser = {
  email: string;
  _id: string;
  name: string;
  lastName: string;
  manager: string;
  role: 'manager' | 'user';
};

export type { TUser, TFullDataUser };
