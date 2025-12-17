import { useState, useEffect } from 'react';
import TimeWeatherCard from './components/TimeWeatherCard';
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
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleLanguage = () => setLanguage(language === 'es' ? 'en' : 'es');

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Theme Toggle - Fixed at top-left */}
      <div className="fixed top-6 left-6 z-50">
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </div>

      {/* Language Toggle - Fixed at top-right */}
      <div className="fixed top-6 right-6 z-50">
        <LanguageToggle language={language} onToggle={toggleLanguage} />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-20 md:py-24 flex flex-col items-center justify-center min-h-screen gap-8 md:gap-12">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-semibold text-center text-black dark:text-white">
          Whatime
        </h1>

        {/* Combined Card */}
        <TimeWeatherCard language={language} />

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>MisterFulanito 2025</p>
        </footer>
      </div>
    </div>
  );
}

export default App;