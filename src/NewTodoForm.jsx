import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPenToSquare  } from '@fortawesome/free-solid-svg-icons'
import { motion } from "framer-motion";
import DateTimePicker from './DateTimePicker';
import { useTranslation } from "react-i18next";

export function NewTodoForm({ onSubmit, isEditing, editingTodo }) {
  const [newItem, setNewItem] = useState("");
  const [dueDate, setDueDate] = useState("");
  const fapl = <FontAwesomeIcon className="fapl" icon={faPlus} />;
  const fape = <FontAwesomeIcon className="fape" icon={faPenToSquare} />;
  const { t } = useTranslation();
  

  useEffect(() => {
    if (isEditing && editingTodo) {
      setNewItem(editingTodo.title);
      setDueDate(editingTodo.dueDate);
    }
  }, [isEditing, editingTodo]);

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem === "") return;

    onSubmit({ title: newItem, dueDate });
    setNewItem("");
    setDueDate("");
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form" autoComplete="off">
      <div className="form-row">
        <motion.input
          layout
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          type="text"
          id="item"
          placeholder={t('eath')}
          className="maininput"
        />
        <motion.div  whileHover={{ scale: 1.05 }} transition={{duration: 0.25,}} className="datetime-input">
          
        <DateTimePicker dueDate={dueDate} setDueDate={setDueDate} />
        </motion.div>
        <motion.button  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.85 }} transition={{duration: 0.25,}} className='btn' id={isEditing ? "fape" : "fapl"}>
          {fape}
          {fapl}
        </motion.button>
      </div>
      
    </form>
  );
}
