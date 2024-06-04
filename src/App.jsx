import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm";
import "./styles.css";
import { TodoList } from "./TodoList";
import Modal from 'react-modal';

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  const [isLightModeLoaded, setIsLightModeLoaded] = useState(() => {
    const localValue = localStorage.getItem("isLightModeLoaded");
    return localValue ? JSON.parse(localValue) : false;
  });
  
  useEffect(() => {
    localStorage.setItem("isLightModeLoaded", JSON.stringify(isLightModeLoaded));
  }, [isLightModeLoaded]);
  

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id);
    });
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteAll = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setTodos([]);
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const toggleTheme = () => {
    setIsLightModeLoaded(!isLightModeLoaded); 
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCancelDelete}
        contentLabel="Delete all todos"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',  
          },
          content: {
            position: 'block',
            backgroundColor: '#1e1f20',
            border: 'none',
            borderRadius: '32px',
            padding: '20px',
            width: 'min(830px , 90%)',
            height: 'auto',
            color: '#caccce'
          }
        }}
      >
        <h2>Are you sure you want to delete all todos?</h2>
        
        <div className="buttons">
          <button onClick={handleConfirmDelete}>Yes</button>
          <button onClick={handleCancelDelete}>Cancel</button>
        </div>
        <p className="overlayP">*This action cannot be undone.</p>
      </Modal>
      <header>
        <h1>TaskApp</h1>
        
        <div className="icons">
          <button onClick={toggleTheme}>
          {isLightModeLoaded && <link rel="stylesheet" type="text/css" href="./public/light-mode.css" />}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24.5 14C24.5 8.20312 19.7969 3.5 14 3.5V24.5C19.7969 24.5 24.5 19.7969 24.5 14ZM0 14C0 10.287 1.475 6.72601 4.10051 4.10051C6.72601 1.475 10.287 0 14 0C17.713 0 21.274 1.475 23.8995 4.10051C26.525 6.72601 28 10.287 28 14C28 17.713 26.525 21.274 23.8995 23.8995C21.274 26.525 17.713 28 14 28C10.287 28 6.72601 26.525 4.10051 23.8995C1.475 21.274 0 17.713 0 14Z" fill="#CACCCE"/>
            </svg>
          </button>
          <button onClick={handleDeleteAll}>
            <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.24286 0.967969C7.53214 0.371875 8.12679 0 8.775 0H15.225C15.8732 0 16.4679 0.371875 16.7571 0.967969L17.1429 1.75H22.2857C23.2339 1.75 24 2.53203 24 3.5C24 4.46797 23.2339 5.25 22.2857 5.25H1.71429C0.766071 5.25 0 4.46797 0 3.5C0 2.53203 0.766071 1.75 1.71429 1.75H6.85714L7.24286 0.967969ZM1.71429 7H22.2857V24.5C22.2857 26.4305 20.7482 28 18.8571 28H5.14286C3.25179 28 1.71429 26.4305 1.71429 24.5V7ZM6.85714 10.5C6.38571 10.5 6 10.8938 6 11.375V23.625C6 24.1063 6.38571 24.5 6.85714 24.5C7.32857 24.5 7.71429 24.1063 7.71429 23.625V11.375C7.71429 10.8938 7.32857 10.5 6.85714 10.5ZM12 10.5C11.5286 10.5 11.1429 10.8938 11.1429 11.375V23.625C11.1429 24.1063 11.5286 24.5 12 24.5C12.4714 24.5 12.8571 24.1063 12.8571 23.625V11.375C12.8571 10.8938 12.4714 10.5 12 10.5ZM17.1429 10.5C16.6714 10.5 16.2857 10.8938 16.2857 11.375V23.625C16.2857 24.1063 16.6714 24.5 17.1429 24.5C17.6143 24.5 18 24.1063 18 23.625V11.375C18 10.8938 17.6143 10.5 17.1429 10.5Z" fill="#CACCCE"/>
            </svg>
          </button>
        </div>
      </header>
      <NewTodoForm onSubmit={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
