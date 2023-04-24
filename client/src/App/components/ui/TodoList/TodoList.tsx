import { TTodo } from '../../../types/Todos';

type TProps = {
  todos: TTodo[];
};

function TodoList({ todos }: TProps) {
  return (
    <div className="todos__wrapper">
      {todos.map((todo) => (
        <div key={todo._id} style={{ border: '1px solid red', marginTop: 10 }}>
          <h3>{todo.title}</h3>
          <div>{todo.description}</div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
