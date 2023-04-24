import { useState } from 'react';
import { TTodo } from '../../../types/Todos';
import Modal from '../../modal/Modal';
import EditTodoForm from '../../form/EditTodoForm';
import ChangeStatus from '../../form/ChangeStatus';
import UserInfo from '../userInfo/userInfo';
import { useAppSelector } from '../../../../hooks';
import { getCurrentUserData } from '../../../store/user';

type TProps = {
  todo: TTodo;
};

function Todo({ todo }: TProps) {
  const [isModalActive, setIsModalActive] = useState(false);
  const [currentModal, setCurrentModal] = useState<'descr' | 'status'>('descr');

  const currentUser = useAppSelector(getCurrentUserData());

  const handleClick = (type: 'descr' | 'status') => {
    setCurrentModal(type);
    setIsModalActive(true);
  };

  const isDisabled = (id: string) => {
    return currentUser?.id !== id;
  };

  return (
    <>
      <h3>{todo.title}</h3>
      <div>{todo.description}</div>
      <div>Priority: {todo.priority}</div>
      <div>Status: {todo.status}</div>
      <div>Created: {todo.created}</div>
      <div>Deadline: {todo.deadline}</div>
      <UserInfo text="Autor" userId={todo.author} />
      <UserInfo text="Responsible" userId={todo.responsible} />
      <div style={{ display: 'flex' }}>
        <button type="button" disabled={isDisabled(todo.responsible)} onClick={() => handleClick('descr')}>
          Change description
        </button>
        <button type="button" disabled={isDisabled(todo.responsible)} onClick={() => handleClick('status')}>
          Change status
        </button>
      </div>
      {isModalActive && (
        <Modal setActive={setIsModalActive}>
          {currentModal === 'descr' ? (
            <EditTodoForm data={todo} setActive={setIsModalActive} />
          ) : (
            <ChangeStatus data={todo} setActive={setIsModalActive} />
          )}
        </Modal>
      )}
    </>
  );
}

export default Todo;
