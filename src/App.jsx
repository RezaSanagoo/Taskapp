import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { NewTodoForm } from "./NewTodoForm";
import { CustomFileInput } from './CustomFileInput';
import { ThemeToggle } from './ThemeToggle';
import "./styles.css";
import { TodoList } from "./TodoList";
import Modal from 'react-modal';
import './i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from "framer-motion";

export default function App() {

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('https://taskapp.yanate.ir/service-worker.js').then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, (error) => {
      console.log('ServiceWorker registration failed: ', error);
    });
  });
}


  const { t, i18n } = useTranslation();

  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  const [categories, setCategories] = useState(() => {
    const localValue = localStorage.getItem("CATEGORIES");
    if (localValue == null) return ["Default"];
    return JSON.parse(localValue);
  });

  const [selectedCategory, setSelectedCategory] = useState(() => {
    const localValue = localStorage.getItem("SELECTED_CATEGORY");
    return localValue ? localValue : "Default";
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const [language, setLanguage] = useState(() => {
    const localValue = localStorage.getItem("LANGUAGE");
    return localValue ? localValue : "en";
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (!categories.includes("Default")) {
      setCategories([...categories, "Default"]);
    }
    localStorage.setItem("CATEGORIES", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("SELECTED_CATEGORY", selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    localStorage.setItem("LANGUAGE", language);
    i18n.changeLanguage(language);
    if (language === 'fa') {
      document.body.style.direction = 'rtl';
    } else {
      document.body.style.direction = 'ltr';
    }
  }, [language, i18n]);

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  function addTodo({ title, dueDate }) {
    if (isEditing) {
      setTodos(currentTodos => {
        return currentTodos.map(todo => {
          if (todo.id === editingTodo.id) {
            return { ...todo, title, dueDate };
          }
          return todo;
        });
      });
      setIsEditing(false);
      setEditingTodo(null);
    } else {
      setTodos(currentTodos => {
        return [
          ...currentTodos,
          { id: crypto.randomUUID(), title, completed: false, category: selectedCategory, dueDate },
        ];
      });
    }
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

  const requestNotificationPermission = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          alert('Notification permission granted!');
        }
      });
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleDeleteAll = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCategory !== "Default") {
      setCategories(currentCategories => currentCategories.filter(category => category !== selectedCategory));
  
      setTodos(currentTodos => currentTodos.filter(todo => todo.category !== selectedCategory));
  
      setSelectedCategory("Default");
    } else {
      setTodos(currentTodos => currentTodos.filter(todo => todo.category !== "Default"));
    }
    setIsModalOpen(false);
  };
  

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleCategorySubmit = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleEditTodo = (todo) => {
    setIsEditing(true);
    setEditingTodo(todo);
  };

  const showLocalNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body: body,
        icon: '/icon.png'
      });
    }
  };
  

  useEffect(() => {
    todos.forEach(todo => {
      if (todo.dueDate != "") {
        const timeUntilDue = new Date(todo.dueDate) - new Date();
        if (timeUntilDue > 0) {
          setTimeout(() => {
            showLocalNotification(t('TR'), `${t('HIR')} ${todo.title}!`);
          }, timeUntilDue);
        }
      }
    });
  }, [todos]);
  
  const handleExport = () => {
    const dataStr = JSON.stringify({ todos, categories, selectedCategory });
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const importedData = JSON.parse(e.target.result);
      setTodos(importedData.todos);
      setCategories(importedData.categories);
      setSelectedCategory(importedData.selectedCategory);
    };
    fileReader.readAsText(event.target.files[0]);
  };

  const changeLanguage = (lng) => {
    setLanguage(lng);
  };
  
  const yesno = <><motion.button layout whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleConfirmDelete} className="btn inSettingsBtn red">{t('Yes')}</motion.button>
<motion.button layout whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleCancelDelete} className="btn inSettingsBtn">{t('No')}</motion.button></>
  const qyesno = <>
  <CustomFileInput onChange={handleImport} />
  <motion.button whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={handleExport} className="btn inSettingsBtn">{t('export')}</motion.button>
  <motion.button whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleDeleteAll} className="btn inSettingsBtn">{t('delete')}</motion.button></>

  return (
    <>
      <AnimatePresence>
        {isCategoryModalOpen && (
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCategoryModalOpen(false)}
          className="modelBack"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="modelIn"
          >
              <h2>{t('settings')}</h2>
              <div className="settings">
                <h2>{t('Lists')}</h2>
                <div className="selcat">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="btn inSettingsBtnsel"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="addcat">
                  <input
                    type="text"
                    placeholder={t('New List')}
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="btn inSettingsBtninput"
                  />
                  <motion.button whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCategorySubmit} className="btn inSettingsBtn">{t('Add list')}</motion.button>
                </div>
                <h2>{t('Manage Data')}</h2>
                <div className="ied">
                  
                  
                  {isModalOpen ? yesno : qyesno}
                </div>
                  
                <h2>{t('Select Language')}</h2>
                <select className="btn inSettingsBtnsel" value={language} onChange={(e) => changeLanguage(e.target.value)}>
                  <option value="en">English</option>
                  <option value="fa">فارسی</option>
                </select>
                <div className="ied">
                <motion.button whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn inSettingsBtn" onClick={() => setIsCategoryModalOpen(false)}>{t('Close')}</motion.button>
                  <motion.button whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn inSettingsBtn" onClick={requestNotificationPermission}>{t('not')}</motion.button>
                  </div>
                <p className="credit">{t('credit')}<a href="https://sanagou.ir"><span>{t('rez')}</span></a>.</p>
              </div>
            
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        
          
      </AnimatePresence>
      <div>
        <div className="header">
          <span>{t('TaskApp')}</span>
          <div style={{display: "flex"}}>
            <ThemeToggle currentTheme={theme} onThemeChange={handleThemeChange} />
            <motion.button  whileHover={{ y: -4 }} whileTap={{ y: 4 }} transition={{duration: 0.25}}
              onClick={() => setIsCategoryModalOpen(true)}>
              <FontAwesomeIcon icon={faSliders} />
            </motion.button>
          </div>
        </div>
        <NewTodoForm onSubmit={addTodo} isEditing={isEditing} editingTodo={editingTodo} />
        <TodoList todos={todos.filter(todo => todo.category === selectedCategory)} toggleTodo={toggleTodo} deleteTodo={deleteTodo} handleEditTodo={handleEditTodo} />
      </div>
    </>
  );
}
