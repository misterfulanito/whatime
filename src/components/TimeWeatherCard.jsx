import { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, CloudDrizzle, CloudLightning, Wind, Droplets } from 'lucide-react';
import { getWeatherByCoords, getCurrentLocation } from '../services/weatherAPI';
import { getTranslation } from '../i18n/translations';
import LocationIcon from './icons/LocationIcon';
import CalendarIcon from './icons/CalendarIcon';

const TimeWeatherCard = ({ language }) => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const location = await getCurrentLocation();
      const weatherData = await getWeatherByCoords(location.lat, location.lon);
      setWeather(weatherData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const iconProps = { size: 32, strokeWidth: 2 };

    switch (condition) {
      case 'clear':
        return <Sun {...iconProps} className="text-black dark:text-white" />;
      case 'clouds':
        return <Cloud {...iconProps} className="text-black dark:text-white" />;
      case 'rain':
        return <CloudRain {...iconProps} className="text-black dark:text-white" />;
      case 'drizzle':
        return <CloudDrizzle {...iconProps} className="text-black dark:text-white" />;
      case 'thunderstorm':
        return <CloudLightning {...iconProps} className="text-black dark:text-white" />;
      case 'snow':
        return <CloudSnow {...iconProps} className="text-black dark:text-white" />;
      default:
        return <Cloud {...iconProps} className="text-black dark:text-white" />;
    }
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

  if (loading) {
    return (
      <div style={{ width: '371px' }} className="bg-white dark:bg-gray-800 p-12 card-shadow dark:card-shadow-dark" style={{ borderRadius: '12px', width: '371px' }}>
        <div className="text-center py-8">
          <div className="animate-pulse text-xl text-gray-600 dark:text-gray-300">
            {getTranslation(language, 'loading')}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ borderRadius: '12px', width: '371px' }} className="bg-white dark:bg-gray-800 p-12 card-shadow dark:card-shadow-dark">
        <div className="text-center py-8">
          <div className="text-red-500 mb-4">{getTranslation(language, 'error')}</div>
          <button
            onClick={fetchWeather}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            {getTranslation(language, 'retry')}
          </button>
        </div>
      </div>
    );
  }

  const cardStyle = {
    display: 'flex',
    width: '371px',
    padding: '48px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: '12px',
    background: '#FFF',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.05), 0 8px 24px 0 rgba(0, 0, 0, 0.05)',
  };

  const cardStyleDark = {
    ...cardStyle,
    background: '#1f2937',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.3), 0 8px 24px 0 rgba(0, 0, 0, 0.2)',
  };

  // Row item style matching Figma specs
  const rowStyle = {
    display: 'flex',
    padding: '12px 0',
    alignItems: 'center',
    gap: '8px',
    alignSelf: 'stretch',
  };

  return (
    <div
      style={cardStyle}
      className="dark:bg-gray-800 transition-all duration-300"
      style={document.documentElement.classList.contains('dark') ? cardStyleDark : cardStyle}
    >
      {/* Location */}
      <div style={rowStyle}>
        <LocationIcon size={32} color="currentColor" className="text-black dark:text-white flex-shrink-0" />
        <div className="text-black dark:text-white text-base font-normal">
          {weather.city}, {weather.country}
        </div>
      </div>

      {/* Weather & Temperature */}
      <div style={rowStyle}>
        {getWeatherIcon(weather.condition)}
        <div className="flex flex-col">
          <div className="text-black dark:text-white text-base font-normal">
            {weather.temperature}°C
          </div>
          <div className="text-black dark:text-white text-base font-normal capitalize">
            {getTranslation(language, weather.condition)}
          </div>
        </div>
      </div>

      {/* Date */}
      <div style={rowStyle}>
        <CalendarIcon size={32} color="currentColor" className="text-black dark:text-white flex-shrink-0" />
        <div className="text-black dark:text-white text-base font-normal">
          {formatDate(time)}
        </div>
      </div>

      {/* Wind Speed */}
      <div style={rowStyle}>
        <Wind size={32} strokeWidth={2} className="text-black dark:text-white flex-shrink-0" />
        <div className="flex flex-col">
          <div className="text-black dark:text-white text-base font-normal">
            {weather.humidity}%
          </div>
          <div className="text-black dark:text-white text-base font-normal">
            {getTranslation(language, 'windSpeed')}
          </div>
          <div className="text-black dark:text-white text-base font-normal">
            {weather.windSpeed} km/h
          </div>
        </div>
      </div>

      {/* Humidity */}
      <div style={rowStyle}>
        <Droplets size={32} strokeWidth={2} className="text-black dark:text-white flex-shrink-0" />
        <div className="flex flex-col">
          <div className="text-black dark:text-white text-base font-normal">
            {getTranslation(language, 'humidity')}
          </div>
          <div className="text-black dark:text-white text-base font-normal">
            {weather.humidity}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeWeatherCard;
