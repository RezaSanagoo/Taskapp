import { TodoItem } from "./TodoItem";

export function TodoList({ todos, toggleTodo, deleteTodo, categories }) {
  const getCategoryName = (categoryId) => {
    return categories.find((category) => category.id === categoryId)?.name || "";
  };

  return (
    <ul className="list">
      {/* Display welcome message if no todos */}
      {todos.length === 0 && (
        <p>
          <span>Welcome,</span><br />
          Add your daily tasks here.
        </p>
      )}

      {/* Map through todos and render TodoItem components */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo} // Pass individual todo as prop
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          getCategoryName={getCategoryName} // Pass getCategoryName function
        />
      ))}
    </ul>
  );
}

