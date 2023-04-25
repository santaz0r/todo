import { useForm } from 'react-hook-form';
import TextField from './inputs/TextField';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getCurrentUserData, getUsersGroup } from '../../store/user';
import { createTodo } from '../../store/todos';
import SelectField from './inputs/SelectField';
import { Priority, Status } from '../../types/Enums';
import transformData from '../../utils/dataTransform';

type TProps = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TodoFormFields = {
  title: string;
  description: string;
  deadline: string;
  priority: string;
  responsible: string;
};

const selectOptions = [
  { label: Priority.high, value: Priority.high },
  { label: Priority.middle, value: Priority.middle },
  { label: Priority.low, value: Priority.low },
];

function CreateTodoForm({ setActive }: TProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormFields>();

  const currentUser = useAppSelector(getCurrentUserData());

  const myGroup = useAppSelector(getUsersGroup(currentUser!.id));

  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit((payload) => {
    const today = new Date().toISOString().split('T')[0];

    const newPayload = {
      ...payload,
      created: today,
      author: currentUser!.id,
      responsible: payload.responsible || currentUser!.id,
      status: Status.fulfillment,
    };

    dispatch(createTodo(newPayload, setActive));
  });
  return (
    <>
      <h2>Create new todo</h2>
      <form onSubmit={onSubmit}>
        <TextField label="Title" field="title" register={register} error={errors} />
        <TextField label="Description" field="description" register={register} error={errors} />
        <TextField label="Dead line" field="deadline" type="date" register={register} error={errors} />
        <SelectField
          options={selectOptions}
          defaultOption="choose..."
          disabledOption={false}
          error={errors}
          label="Todo priority"
          field="priority"
          register={register}
        />
        {currentUser!.role === 'manager' && (
          <SelectField
            options={transformData(myGroup)}
            defaultOption="choose..."
            disabledOption={false}
            error={errors}
            label="Choose a responsible"
            field="responsible"
            register={register}
          />
        )}
        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default CreateTodoForm;
