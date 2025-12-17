import { useState, useEffect } from 'react';
import { getTranslation } from '../i18n/translations';
import CalendarIcon from './icons/CalendarIcon';

const Clock = ({ language }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const months = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];

    const dayName = getTranslation(language, days[date.getDay()]);
    const monthName = getTranslation(language, months[date.getMonth()]);
    const day = date.getDate();
    const year = date.getFullYear();

    return `${dayName}, ${day} ${monthName} ${year}`;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl p-8 md:p-12 card-shadow dark:card-shadow-dark transition-all duration-300">
      {/* Time Display */}
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-semibold text-black dark:text-white mb-2">
          {formatTime(time)}
        </h1>
      </div>

      {/* Date with Calendar Icon */}
      <div className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-300">
        <CalendarIcon
          size={24}
          color="currentColor"
          className="flex-shrink-0"
        />
        <span className="text-lg md:text-xl">
          {formatDate(time)}
        </span>
      </div>
    </div>
  );
};

export default Clock;