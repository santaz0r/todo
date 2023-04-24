import { useState } from 'react';
import { TTodo } from '../../../types/Todos';
import Modal from '../../modal/Modal';
import EditTodoForm from '../../form/EditTodoForm';
import ChangeStatus from '../../form/ChangeStatus';

type TProps = {
  todo: TTodo;
};

function Todo({ todo }: TProps) {
  const [isModalActive, setIsModalActive] = useState(false);
  const [currentModal, setCurrentModal] = useState<'descr' | 'status'>('descr');

  const handleClick = (type: 'descr' | 'status') => {
    setCurrentModal(type);
    setIsModalActive(true);
  };
  return (
    <>
      <h3>{todo.title}</h3>
      <div>{todo.description}</div>
      <div>Priority: {todo.priority}</div>
      <div>Status: {todo.status}</div>
      <div>Created: {todo.created}</div>
      <div>Deadline: {todo.deadline}</div>
      <div>Author: {todo.author}</div>
      <div>Responsible: {todo.responsible}</div>
      <div style={{ display: 'flex' }}>
        <button type="button" onClick={() => handleClick('descr')}>
          Change description
        </button>
        <button type="button" onClick={() => handleClick('status')}>
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
