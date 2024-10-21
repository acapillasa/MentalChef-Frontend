import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const ButtonDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'enabled') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    } else {
      setDarkMode(false);
      document.body.classList.remove('dark-mode');
    }
  }, []);

  const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    setDarkMode(true);
    localStorage.setItem('darkMode', 'enabled');
  };

  const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    setDarkMode(false);
    localStorage.setItem('darkMode', 'disabled');
  };

  const toggleDarkMode = () => {
    if (darkMode) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  };

  return (
    <button className="btn-oscuro" onClick={toggleDarkMode}>
      <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
    </button>
  );
};

export default ButtonDarkMode;
