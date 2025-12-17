import { useState, useEffect } from 'react';
import Clock from './components/Clock';
import Weather from './components/Weather';
import ThemeToggle from './components/ThemeToggle';
import LanguageToggle from './components/LanguageToggle';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'es';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleLanguage = () => setLanguage(language === 'es' ? 'en' : 'es');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header with toggles */}
      <div className="fixed top-6 right-6 flex gap-4 z-10">
        <LanguageToggle language={language} onToggle={toggleLanguage} />
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        <div className="mb-16">
          <Clock language={language} />
        </div>

        <div className="w-full max-w-2xl">
          <Weather language={language} />
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>Whatime - {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;