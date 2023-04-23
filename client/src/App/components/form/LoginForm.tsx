import React from 'react';

import { useForm } from 'react-hook-form';
import TextField from './inputs/TextField';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getAuthErrors, login } from '../../store/user';

type TProps = {
  setCurrentModal: React.Dispatch<React.SetStateAction<'register' | 'login'>>;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export type LoginFormFields = {
  email: string;
  password: string;
};

function LoginForm({ setCurrentModal, setActive }: TProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();

  const authError = useAppSelector(getAuthErrors());
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit((payload) => {
    dispatch(login({ payload, setActive }));
  });

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <TextField label="email" field="email" register={register} error={errors} />
        <TextField
          label="password"
          field="password"
          type="password"
          register={register}
          error={errors}
          formType="login"
        />
        <button type="submit">submit</button>
        {authError && <p>{authError}</p>}
        <button type="button" onClick={() => setCurrentModal('register')} className={'styles.changeModal__btn'}>
          Switch to register
        </button>
      </form>
    </>
  );
}

export default LoginForm;
