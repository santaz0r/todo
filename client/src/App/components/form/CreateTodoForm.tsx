import { useForm } from 'react-hook-form';
import TextField from './inputs/TextField';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getAuthErrors, getCurrentUserData, signUp } from '../../store/user';
import { createTodo } from '../../store/todos';
import { TUser } from '../../types/User.type';

type TProps = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TodoFormFields = {
  title: string;
  description: string;
};

function CreateTodoForm({ setActive }: TProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormFields>();

  const currentUser = useAppSelector(getCurrentUserData());
  console.log(currentUser);

  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit((payload) => {
    const newPayload = {
      ...payload,
      author: currentUser!.id,
    };
    dispatch(createTodo(newPayload, setActive));
  });
  return (
    <>
      <h2>Create new todo</h2>
      <form onSubmit={onSubmit}>
        <TextField label="title" field="title" register={register} error={errors} />
        <TextField label="description" field="description" register={register} error={errors} />
        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default CreateTodoForm;
