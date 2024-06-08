import { TodoItem } from "./TodoItem";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from 'framer-motion';

export function TodoList({ todos, toggleTodo, deleteTodo, handleEditTodo }) {
  const { t } = useTranslation();

  const todosPending = todos.filter(todo => !todo.completed);
  const todosDone = todos.filter(todo => todo.completed);

  var text = (
    <p className="para">
      <span>{t('welcome')}</span><br /> {t('aydth')}
    </p>
  );
  const lists = <>
  <div className="listed">
        <AnimatePresence>
          <motion.ul className="list">
            {todosPending.map(todo => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
              >
                <TodoItem
                  {...todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  handleEditTodo={handleEditTodo}
                />
              </motion.div>
            ))}
          </motion.ul>
          <motion.h2 layout>{t('done')}</motion.h2>
          <motion.ul className="list">
            {todosDone.map(todo => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
              >
                <TodoItem
                  {...todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  handleEditTodo={handleEditTodo}
                />
              </motion.div>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
  </>

  return (
    <div>
      {todos.length === 0 ? text : lists}
      
    </div>
  );
}
