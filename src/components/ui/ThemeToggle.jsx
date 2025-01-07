import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        relative p-2 rounded-lg
        transition-colors duration-300
        ${isDarkMode ? 'bg-dark-card text-yellow-400' : 'bg-light-card text-gray-600'}
        hover:bg-opacity-80
      `}
      aria-label="Toggle dark mode"
    >
      <div className="relative w-6 h-6">
        <div
          className={`
            absolute inset-0 transform transition-transform duration-300
            ${isDarkMode ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}
          `}
        >
          <FiMoon className="w-6 h-6" />
        </div>
        <div
          className={`
            absolute inset-0 transform transition-transform duration-300
            ${isDarkMode ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100'}
          `}
        >
          <FiSun className="w-6 h-6" />
        </div>
      </div>
    </button>
  );
}

export default ThemeToggle; 