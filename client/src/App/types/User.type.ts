type TUser = {
  email: string;
  id: string;
  name: string;
};

type TFullDataUser = {
  email: string;
  _id: string;
  name: string;
  lastName: string;
};

export type { TUser, TFullDataUser };
