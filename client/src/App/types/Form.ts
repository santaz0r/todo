type TAuthProps = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  payload: { email: string; password: string; name?: string; role?: string };
};

export type { TAuthProps };
