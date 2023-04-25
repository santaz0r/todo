import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getCurrentUserData, getIsLogin, getUsersGroup } from '../../store/user';
import { getTodosList, getTodosLoadingStatus, loadTodosList } from '../../store/todos';
import TodoList from '../../components/ui/TodoList/TodoList';
import Modal from '../../components/modal/Modal';
import CreateTodoForm from '../../components/form/CreateTodoForm';
import RadioField from '../../components/form/inputs/RadioField';
import daysDiff from '../../utils/daysDiff';
import ControlledSelect from '../../components/form/inputs/ControlledSelect';
import transformData from '../../utils/dataTransform';
import { TUser } from '../../types/User.type';

function HomePage() {
  const [data, setData] = useState({ group: 'DEFAULT' });
  const [isModalActive, setIsModalActive] = useState(false);
  const [isMine, setMine] = useState(false);
  const [radio, setRadio] = useState<'all' | 'week' | 'today'>('all');
  const isLogin = useAppSelector(getIsLogin());
  const currentUser = useAppSelector(getCurrentUserData());
  const todosLoadingStatus = useAppSelector(getTodosLoadingStatus());
  const todos = useAppSelector(getTodosList());

  const myGroup = useAppSelector(getUsersGroup(currentUser?.id as TUser['id']));

  const filteredTodos = isMine
    ? todos.filter((todo) => todo.author === currentUser?.id || todo.responsible === currentUser?.id)
    : todos;

  const groupFilter = filteredTodos.filter((todo) => {
    if (data.group === 'DEFAULT') return todo;
    return todo.responsible === data.group;
  });

  console.log(data);
  console.log(groupFilter);

  const plannedTodos = groupFilter.filter((todo) => {
    if (radio === 'all') {
      return todo;
    }
    if (radio === 'week') {
      const diff = daysDiff(todo.created, todo.deadline);
      if (diff <= 7) return todo;
    }
    if (radio === 'today') {
      if (todo.created === todo.deadline) return todo;
    }
  });

  const todoFulfillment = plannedTodos.filter((todo) => todo.status.match(/to fulfillment/i)).reverse();
  const todoInProgress = plannedTodos.filter((todo) => todo.status.match(/in progress/i)).reverse();
  const todoDone = plannedTodos.filter((todo) => todo.status.match(/done/i)).reverse();

  const handleChange = (target: { name: string; value: string }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadio(e.target.value as 'all' | 'week' | 'today');
  };

  if (isLogin) {
    return (
      <>
        <h1>Home page</h1>
        <div
          className="options"
          style={{ display: 'flex', justifyContent: 'space-around', width: '100%', alignItems: 'center' }}
        >
          <button onClick={() => setIsModalActive(true)}>Create new todo</button>

          {currentUser?.role === 'manager' ? (
            <ControlledSelect
              options={transformData(myGroup)}
              label="Filter: "
              name="group"
              onChange={handleChange}
              value={data.group}
              defaultOption="All"
              disabledOption={false}
            />
          ) : (
            <label>
              Only my todos
              <input type="checkbox" name="onlyMy" id="onlyMy" onChange={() => setMine((prev) => !prev)} />
            </label>
          )}
          <div style={{ minWidth: '30%', display: 'flex', justifyContent: 'space-between' }}>
            <RadioField
              label="Today"
              name="filter"
              value="today"
              id="filter1"
              state={radio}
              onChange={handleRadioChange}
            />
            <RadioField
              label="On week todos"
              name="filter"
              value="week"
              id="filter2"
              state={radio}
              onChange={handleRadioChange}
            />
            <RadioField label="All" name="filter" value="all" id="filter3" state={radio} onChange={handleRadioChange} />
          </div>
        </div>

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
  return <h1>Please, log in or sign up</h1>;
}

export default HomePage;
