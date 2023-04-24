import { useForm } from 'react-hook-form';
import TextField from './inputs/TextField';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getAuthErrors, getCurrentUserData, signUp } from '../../store/user';
import { createTodo, updateTodo } from '../../store/todos';
import { TUser } from '../../types/User.type';
import SelectField from './inputs/SelectField';
import { TTodo } from '../../types/Todos';
import { Priority } from '../../types/Enums';

type TProps = {
  data: TTodo;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TodoFormFields = {
  title: string;
  description: string;
  deadline: string;
  priority: string;
};

const selectOptions = ['high', 'middle', 'low'];
const selectOptionsStatus = [Priority.fulfillment, Priority.progress, Priority.done];

function EditTodoForm({ data, setActive }: TProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormFields>();

  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit((payload) => {
    const newPayload = {
      ...payload,
      _id: data._id,
      created: data.created,
      author: data.author,
      responsible: data.responsible,
      status: data.status,
    };
    console.log(newPayload);

    dispatch(updateTodo(newPayload, setActive));
  });
  return (
    <>
      <h2>Create new todo</h2>
      <form onSubmit={onSubmit}>
        <TextField label="Title" field="title" register={register} value={data.title} error={errors} />
        <TextField
          label="Description"
          field="description"
          value={data.description}
          register={register}
          error={errors}
        />
        <TextField
          label="Dead line"
          field="deadline"
          type="date"
          value={data.deadline}
          register={register}
          error={errors}
        />
        <SelectField
          options={selectOptions}
          defOpt={data.priority}
          defaultOption="choose..."
          disabledOption={false}
          error={errors}
          label="Todo priority"
          field="priority"
          register={register}
        />
        <button type="submit">Edit</button>
      </form>
    </>
  );
}

export default EditTodoForm;
