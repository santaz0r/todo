import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getIsLogin } from '../../store/user';
import { getTodosList, getTodosLoadingStatus, loadTodosList } from '../../store/todos';
import TodoList from '../../components/ui/TodoList/TodoList';
import Modal from '../../components/modal/Modal';
import CreateTodoForm from '../../components/form/CreateTodoForm';

function HomePage() {
  const isLogin = useAppSelector(getIsLogin());
  const todosLoadingStatus = useAppSelector(getTodosLoadingStatus());
  const todos = useAppSelector(getTodosList());

  const todoFulfillment = todos.filter((todo) => todo.status.match(/to fulfillment/i));
  const todoInProgress = todos.filter((todo) => todo.status.match(/in progress/i));
  const todoDone = todos.filter((todo) => todo.status.match(/done/i));

  const [isModalActive, setIsModalActive] = useState(false);

  if (!isLogin) {
    return <h1>Please, log in or sign up</h1>;
  }
  return (
    <>
      <h1>Home page</h1>
      <button onClick={() => setIsModalActive(true)}>Create new todo</button>

      {todosLoadingStatus ? (
        <p>TODO LOADING</p>
      ) : (
        <div className="todos__wrapper" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div className="todo__fulfillment" style={{ minWidth: '27%' }}>
            <h3>To fulfillment</h3>
            <TodoList todos={todoFulfillment} />
          </div>
          <div className="todo__in-progress" style={{ minWidth: '27%' }}>
            <h3>In progress</h3>
            <TodoList todos={todoInProgress} />
          </div>
          <div className="todo__done" style={{ minWidth: '27%' }}>
            <h3>Done</h3>
            <TodoList todos={todoDone} />
          </div>
        </div>
      )}
      {isModalActive && (
        <Modal setActive={setIsModalActive}>
          <CreateTodoForm setActive={setIsModalActive} />
        </Modal>
      )}
    </>
  );
}

export default HomePage;
