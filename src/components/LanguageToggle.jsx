const LanguageToggle = ({ language, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="px-4 py-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-gray-700 dark:text-white"
      aria-label="Toggle language"
    >
      {language === 'es' ? '🇪🇸 ES' : '🇬🇧 EN'}
    </button>
  );
};

export default LanguageToggle;