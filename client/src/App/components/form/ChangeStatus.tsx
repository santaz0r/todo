import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../hooks';
import { updateTodo } from '../../store/todos';
import SelectField from './inputs/SelectField';
import { TTodo } from '../../types/Todos';
import { Status } from '../../types/Enums';

type TProps = {
  data: TTodo;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TodoFormFields = {
  status: string;
};

const selectOptionsStatus = [
  { label: Status.fulfillment, value: Status.fulfillment },
  { label: Status.progress, value: Status.progress },
  { label: Status.done, value: Status.done },
];

function ChangeStatus({ data, setActive }: TProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormFields>();

  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit((payload) => {
    const newPayload = {
      ...data,
      status: payload.status,
    };

    dispatch(updateTodo(newPayload, setActive));
  });
  return (
    <>
      <h2>Change status</h2>
      <form onSubmit={onSubmit}>
        <SelectField
          options={selectOptionsStatus}
          defOpt={data.status}
          defaultOption="choose..."
          disabledOption={false}
          error={errors}
          label="Status"
          field="status"
          register={register}
        />
        <button type="submit">Change status</button>
      </form>
    </>
  );
}

export default ChangeStatus;
