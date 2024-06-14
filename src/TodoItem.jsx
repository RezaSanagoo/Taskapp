import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export function TodoItem({ id, title, completed, toggleTodo, deleteTodo, handleEditTodo }) {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const deleteThresholdPercent = 0.5;
  const itemRef = useRef(null); 

  const handleDragEnd = (event, info) => {
    if (itemRef.current) {
      const elementWidth = itemRef.current.offsetWidth; 
      const deleteThreshold = -elementWidth * deleteThresholdPercent; 

      if (info.offset.x < deleteThreshold) {
        controls.start({ x: -window.innerWidth }).then(() => deleteTodo(id));
      } else {
        controls.start({ x: 0 });
      }
    }
  };

  useEffect(() => {
    x.set(0); 
  }, [id, x]);

  return (
    <motion.div 
      ref={itemRef}
      animate={controls}
      transition={{ duration: 0.5 }}
      drag="x"
      style={{ x }} 
      onDragEnd={handleDragEnd}
    >
      <motion.li
        initial="hidden"
        animate="visible"
        exit="exit" 
        variants={itemVariants}
        transition={{ duration: 0.5 }}
      >
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={e => toggleTodo(id, e.target.checked)}
          />
          <p>{title}</p>
        </label>
        <div style={{minWidth: 68,}}>
          <button onClick={() => handleEditTodo({ id, title, completed })} style={{ margin: "0 6px" }}>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button onClick={() => deleteTodo(id)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </motion.li>
    </motion.div>
  );
}
