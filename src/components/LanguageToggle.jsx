const LanguageToggle = ({ language, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="px-5 py-3 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 card-shadow dark:card-shadow-dark font-semibold text-gray-700 dark:text-white border border-gray-200 dark:border-gray-700"
      aria-label="Toggle language"
    >
      {language === 'es' ? '🇪🇸 ES' : '🇬🇧 EN'}
    </button>
  );
};

export default LanguageToggle;