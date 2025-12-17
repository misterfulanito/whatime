import { useState, useEffect } from 'react';
import { getTranslation } from '../i18n/translations';

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
    <div className="text-center animate-fade-in">
      <div className="text-8xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        {formatTime(time)}
      </div>
      <div className="text-2xl text-gray-600 dark:text-gray-300">
        {formatDate(time)}
      </div>
    </div>
  );
};

export default Clock;