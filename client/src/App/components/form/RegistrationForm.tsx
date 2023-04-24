import { useForm } from 'react-hook-form';
import TextField from './inputs/TextField';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getAuthErrors, getUsersList, loadUsersList, signUp } from '../../store/user';
import { loadTodosList } from '../../store/todos';
import SelectField from './inputs/SelectField';

type TProps = {
  setCurrentModal: React.Dispatch<React.SetStateAction<'register' | 'login'>>;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export type RegistrationFormFields = {
  email: string;
  password: string;
  name: string;
  lastName: string;
  manager: string;
};

function RegisterForm({ setCurrentModal, setActive }: TProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormFields>();

  const dispatch = useAppDispatch();
  const authError = useAppSelector(getAuthErrors());

  const users = useAppSelector(getUsersList());

  const transformData = (data: typeof users) => {
    return data.map((item) => ({ label: item.name, value: item._id }));
  };

  const onSubmit = handleSubmit((payload) => {
    dispatch(signUp({ payload, setActive }));
  });
  return (
    <>
      <h2>Registration</h2>
      <form onSubmit={onSubmit}>
        <TextField label="Email" field="email" register={register} error={errors} />
        <TextField label="Password" field="password" type="password" register={register} error={errors} />
        <TextField label="Name" field="name" register={register} error={errors} />
        <TextField label="Last name" field="lastName" register={register} error={errors} />
        <SelectField
          options={transformData(users)}
          defaultOption="choose..."
          disabledOption={false}
          error={errors}
          label="Choose your manager"
          field="manager"
          register={register}
        />
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
