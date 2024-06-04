import React from "react";

export function TodoItem({ todo, toggleTodo, deleteTodo, getCategoryName }) {
  return (
    <li key={todo.id}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id, !todo.completed)}
        />
        {todo.title} ({getCategoryName(todo.category)})
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </label>
    </li>
  );
}
