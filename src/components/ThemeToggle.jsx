import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex h-12 w-24 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Toggle theme"
      role="switch"
      aria-checked={isDark}
    >
      {/* Toggle slider */}
      <span
        className={`inline-block h-10 w-10 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isDark ? 'translate-x-12' : 'translate-x-1'
        }`}
      >
        {/* Icon inside the slider */}
        <span className="flex h-full w-full items-center justify-center">
          {isDark ? (
            <Sun className="text-yellow-500" size={20} />
          ) : (
            <Moon className="text-gray-700" size={20} />
          )}
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;