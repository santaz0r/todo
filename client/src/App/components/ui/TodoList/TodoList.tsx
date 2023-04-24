import { TTodo } from '../../../types/Todos';

type TProps = {
  todos: TTodo[];
};

function TodoList({ todos }: TProps) {
  return (
    <div className="todos__wrapper">
      {todos.map((todo) => (
        <div key={todo._id}>
          <h3>{todo.title}</h3>
          <div>{todo.description}</div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
