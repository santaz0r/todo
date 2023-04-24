import { TTodo } from '../../../types/Todos';
import Todo from './Todo';

type TProps = {
  todos: TTodo[];
};

function TodoList({ todos }: TProps) {
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo._id} style={{ border: '1px solid red', marginTop: 10, padding: 15 }}>
          <Todo todo={todo} />
        </div>
      ))}
    </div>
  );
}

export default TodoList;
