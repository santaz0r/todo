import { useForm } from 'react-hook-form';
import TextField from './inputs/TextField';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getAuthErrors, signUp } from '../../store/user';

type TProps = {
  setCurrentModal: React.Dispatch<React.SetStateAction<'register' | 'login'>>;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export type RegistrationFormFields = {
  email: string;
  password: string;
  name: string;
};

function RegisterForm({ setCurrentModal, setActive }: TProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormFields>();

  const dispatch = useAppDispatch();
  const authError = useAppSelector(getAuthErrors());

  const onSubmit = handleSubmit((payload) => {
    dispatch(signUp({ payload, setActive }));
  });
  return (
    <>
      <h2>Registration</h2>
      <form onSubmit={onSubmit}>
        <TextField label="email" field="email" register={register} error={errors} />
        <TextField label="password" field="password" type="password" register={register} error={errors} />
        <TextField label="name" field="name" register={register} error={errors} />
        <button type="submit">submit</button>
        {authError && <p>{authError}</p>}
        <button type="button" onClick={() => setCurrentModal('login')} className={'styles.changeModal__btn'}>
          Switch to login
        </button>
      </form>
    </>
  );
}

export default RegisterForm;
