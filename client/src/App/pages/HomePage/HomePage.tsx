import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getIsLogin } from '../../store/user';
import { getTodosList, getTodosLoadingStatus, loadTodosList } from '../../store/todos';
import TodoList from '../../components/ui/TodoList/TodoList';

function HomePage() {
  const isLogin = useAppSelector(getIsLogin());
  const todosLoadingStatus = useAppSelector(getTodosLoadingStatus());
  const todos = useAppSelector(getTodosList());
  if (!isLogin) {
    return <h1>Please, log in or sign up</h1>;
  }
  return (
    <>
      <h1>Home page</h1>
      <button>Create new todo</button>
      {todosLoadingStatus ? <p>TODO LOADING</p> : <TodoList todos={todos} />}
    </>
  );
}

export default HomePage;
