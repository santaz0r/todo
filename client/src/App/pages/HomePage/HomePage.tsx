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

  const [isModalActive, setIsModalActive] = useState(false);

  if (!isLogin) {
    return <h1>Please, log in or sign up</h1>;
  }
  return (
    <>
      <h1>Home page</h1>
      <button onClick={() => setIsModalActive(true)}>Create new todo</button>
      {todosLoadingStatus ? <p>TODO LOADING</p> : <TodoList todos={todos} />}
      {isModalActive && (
        <Modal setActive={setIsModalActive}>
          <CreateTodoForm setActive={setIsModalActive} />
        </Modal>
      )}
    </>
  );
}

export default HomePage;
