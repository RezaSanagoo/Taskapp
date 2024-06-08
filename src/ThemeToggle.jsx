import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";

export function ThemeToggle({ currentTheme, onThemeChange }) {
  const [theme, setTheme] = useState(currentTheme);
    
  const moon = <FontAwesomeIcon icon={faMoon} />;
  const sun = <FontAwesomeIcon icon={faSun} />;
  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    onThemeChange(newTheme);
  };

  return (
    <motion.button whileHover={{ y: -4 }} whileTap={{ y: 4 }} transition={{duration: 0.25}} onClick={toggleTheme} className='themesw'>
      {theme === 'light' ? sun : moon}
    </motion.button>
  );
}
